package com.ishaan.project.service;

import com.ishaan.project.model.AuthenticationProvider;
import com.ishaan.project.model.AuthenticationResponse;
import com.ishaan.project.model.User;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class RegistrationService implements UserDetailsService {

    @Autowired
    private RegistrationRepository repo;

    @Autowired
    private JwtUtil jwtTokenUtil;

    public User saveUser(User user){
        user.setPassword(getEncodedString(user.getPassword()));   //encoding password
        user.setConfirmPassword(getEncodedString(user.getConfirmPassword()));   //encoding confirm_Password
        user.setEnabled(false);
        return repo.save(user);   // saving user
    }


    public Iterable<User> fetchAll() {
        return repo.findAllByOrderByNoOfPostsDesc();
    }

    public User fetchUserById(int id){ return  repo.findById(id); }


    public User fetchUserByUsername(String username){
        return repo.findByUsername(username);
    }

    public User fetchUserByUsernameAndPassword(String username, String password){
        return repo.findByUsernameAndPassword(username, password);
    }

    public void createNewUserAfterOAuthLoginSuccess(String username, String name, AuthenticationProvider authProvider){
        User user = new User();
        user.setUsername(username);
        user.setFirstName(name);
        user.setAuthProvider(authProvider);
        user.setRoles("admin");
        user.setEnabled(true);
        repo.save(user);

    }

    public void updateUserAfterOAuthLoginSuccess(User user, AuthenticationProvider authProvider) {
        user.setAuthProvider(authProvider);
        repo.save(user);
    }

    // function to encode password
    public String getEncodedString(String password){
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = this.repo.findByUsername(s);

        String roles[] = user.getRoles().split(",");
        List<SimpleGrantedAuthority> rolesL = new ArrayList<>();
        for(String r:roles){
            rolesL.add(new SimpleGrantedAuthority(r));
        }

        if(user == null){
            throw new UsernameNotFoundException("Could not find user");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), rolesL);
    }

}
