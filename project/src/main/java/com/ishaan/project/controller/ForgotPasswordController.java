package com.ishaan.project.controller;

import com.ishaan.project.model.EditPasswordRequest;
import com.ishaan.project.model.User;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.EmailService;
import com.ishaan.project.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


@RestController
public class ForgotPasswordController {

    @Autowired
    private RegistrationService service;

    @Autowired
    private RegistrationRepository userRepo;

    @Autowired
    private EmailService emailService;


    @PostMapping("/generateOtp/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public int generateOtp(@PathVariable("username") String username) throws Exception{

        User user = service.fetchUserByUsername(username);
        if(user == null) throw new Exception("Enter valid email-Id");
        int otp = 100000 + (int)(Math.random() * (900000));
        DateFormat df = new SimpleDateFormat("dd/MM/yy HH:mm:ss");

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getUsername());
        mailMessage.setSubject("Forgot Password!");
        mailMessage.setFrom("gomailsender@gmail.com");
        mailMessage.setText("It seems you have forgotten your password. You don't need to worry. Here is your OTP : "
                + otp + ". Use this to reset your password. Caution: This otp is valid only for 3 minutes.");

        emailService.sendEmail(mailMessage);


        Calendar calendar = Calendar.getInstance();
        String curTime = df.format(calendar.getTime());
        user.setOtp(otp);
        user.setOtpCreationTime(curTime);
        userRepo.save(user);
        return otp;
    }

    @PostMapping("/validateOtp/{username}/{otp}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User validateOtp(@PathVariable("username") String username, @PathVariable("otp") int otp) throws Exception{
        User user = service.fetchUserByUsername(username);
        if(otp == user.getOtp()) {
            DateFormat df = new SimpleDateFormat("dd/MM/yy HH:mm:ss");
            Calendar calendar = Calendar.getInstance();
            String curTime = df.format(calendar.getTime());
            Date d1 = df.parse(user.getOtpCreationTime());
            Date d2 = df.parse(curTime);
            Long timeDifferenceInMilliseconds = d2.getTime() - d1.getTime();
            if (timeDifferenceInMilliseconds >= 180000) throw new Exception("Otp Expired!");
            user.setOtp(0);
            user.setOtpCreationTime(null);
            userRepo.save(user);
            return user;
        }
        throw new Exception("Wrong OTP! Enter correct OTP.");
    }

    @PostMapping("/forgotPassword")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User forgotPassword(@RequestBody EditPasswordRequest editPasswordRequest) throws Exception{

        if(editPasswordRequest.getNewPassword().equals(editPasswordRequest.getNewConfirmPassword())){
            User user = service.fetchUserByUsername(editPasswordRequest.getUsername());
            user.setPassword(service.getEncodedString(editPasswordRequest.getNewPassword()));
            user.setConfirmPassword(service.getEncodedString(editPasswordRequest.getNewConfirmPassword()));
            userRepo.save(user);
            return user;
        }
        throw new Exception("Password must match.");
    }
}
