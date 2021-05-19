package com.ishaan.project.controller;

import com.ishaan.project.model.*;
import com.ishaan.project.repository.ConfirmationTokenRepository;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.EmailService;
import com.ishaan.project.service.RegistrationService;
import com.ishaan.project.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.UUID;

@RestController
@Validated
public class RegistrationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RegistrationService service;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private RegistrationRepository userRepository;

    //registration and sending of verification mail
    @PostMapping("/registeruser")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User registerUser(@RequestBody User user) throws Exception {
        //checking if email already exists
        String tempUsername = user.getUsername();
        String tempPassword = user.getPassword();
        String tempConfirmPassword = user.getConfirmPassword();

        if(tempUsername != null && !"".equals(tempUsername)){
            User userObj = service.fetchUserByUsername(tempUsername);

            if(userObj != null){
                throw new Exception("user with " + tempUsername + "already exists");
            }
        }

        //checking if password matches with confirm_Password
        if(tempPassword.equals(tempConfirmPassword)){
            User userObj = null;
            userObj = service.saveUser(user);

            //accessing token
            ConfirmationToken confirmationToken = new ConfirmationToken(user);
            confirmationTokenRepository.save(confirmationToken);

            //sending verification email
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getUsername());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setFrom("gomailsender@gmail.com");
            mailMessage.setText("To confirm your account, please click here : "
                    +"http://a16948151ae7.ngrok.io/confirm-account?token="+confirmationToken.getConfirmationToken());

            emailService.sendEmail(mailMessage);

            return userObj;
        }
        else{
            throw new Exception("Password must match");
        }
    }

    //verification of emailId
    @GetMapping(value="/confirm-account")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
        //System.out.println(token);
        if (token != null) {
            User user = userRepository.findByUsername(token.getUser().getUsername());
            user.setEnabled(true);
            userRepository.save(user);
            ResponseEntity.status(200);
            return ResponseEntity.ok("Your account has been successfully Verified!");
        } else {
            ResponseEntity.status(404);
            return ResponseEntity.notFound().build();
        }
    }

    //login for user already registered
    @PostMapping("/login")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> loginUser(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        String tempUsername = authenticationRequest.getUsername();
        String tempPass = getEncodedString(authenticationRequest.getPassword());
        User user = service.fetchUserByUsername(tempUsername);

        User userObj = null;
        if(tempUsername != null && tempPass != null){
            userObj = service.fetchUserByUsernameAndPassword(tempUsername, tempPass);
        }
        if(userObj == null) throw new Exception("Bad Credentials");
        else{

            final UserDetails userDetails = service
                    .loadUserByUsername(authenticationRequest.getUsername());

            if (userObj.isEnabled()) {
                final String jwt = jwtTokenUtil.generateToken(userDetails);
                return ResponseEntity.ok(new AuthenticationResponse(jwt));
            }
            else {
                //creating new token and saving it
                String token = UUID.randomUUID().toString();
                ConfirmationToken confirmationToken = confirmationTokenRepository.findByTokenId((long)user.getId());
                confirmationToken.setConfirmationToken(token);
                confirmationTokenRepository.save(confirmationToken);

                //Resending verification email
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setTo(user.getUsername());
                mailMessage.setSubject("Complete Registration!");
                mailMessage.setFrom("gomailsender@gmail.com");
                mailMessage.setText("This is new confirmation link, to confirm your account, please click here: "
                        +"http://a16948151ae7.ngrok.io/confirm-account?token="+confirmationToken.getConfirmationToken()
                        + "\n\n\n\nRegards: @Team ClickNShip");

                emailService.sendEmail(mailMessage);
                return ResponseEntity.ok("Not Verified!");
            }
        }
    }

    //Returning user details using his/her username.
    @GetMapping("/user/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User findUser(@PathVariable String username){
        User user = service.fetchUserByUsername(username);
        return user;
    }

    @GetMapping("/allUser")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Iterable<User> findUser(){
       return service.fetchAll();
    }

    @PostMapping("/oauth2/{username}/{name}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> loginUserUsingOAuth2(@PathVariable("username") String username, @PathVariable("name") String name) {
        User user = service.fetchUserByUsername(username);
        if(user == null){
            service.createNewUserAfterOAuthLoginSuccess(username, name, AuthenticationProvider.GOOGLE);
            return ResponseEntity.ok("Null");
        }
        else{
            service.updateUserAfterOAuthLoginSuccess(user, AuthenticationProvider.GOOGLE);
            final UserDetails userDetails = service.loadUserByUsername(username);
            final String jwt = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        }
    }

    @PostMapping("/registerOAuth2User")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> registerOAuth2User(@RequestBody User userObj) throws Exception {
        String username = userObj.getUsername();
        User user = service.fetchUserByUsername(username);
        String tempPassword = userObj.getPassword();
        String tempConfirmPassword = userObj.getConfirmPassword();

        if (tempPassword.equals(tempConfirmPassword)) {
            user.setPassword(getEncodedString(tempPassword));
            user.setConfirmPassword(getEncodedString(tempConfirmPassword));
            user.setFirstName(userObj.getFirstName());
            user.setLastName(userObj.getLastName());
            user.setEnabled(true);
            userRepository.save(user);

            //accessing token
            ConfirmationToken confirmationToken = new ConfirmationToken(user);
            confirmationTokenRepository.save(confirmationToken);


            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(username);
            mailMessage.setSubject("Successful Registration!");
            mailMessage.setFrom("gomailsender@gmail.com");
            mailMessage.setText("Your account with name : " + user.getFirstName() + " " + user.getLastName() + "has successfully registered to College Cabin.");

            emailService.sendEmail(mailMessage);

            final UserDetails userDetails = service.loadUserByUsername(username);
            final String jwt = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        }
        else{
            throw new Exception("Password must match");
        }

    }

    //encoding incoming password to check with the encoded password in database
    private String getEncodedString(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

}


