package com.ishaan.project.controller;

import com.ishaan.project.model.EditPasswordRequest;
import com.ishaan.project.model.User;
import com.ishaan.project.model.UserDetailsRequest;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@RestController
public class UserDetailsController {

    @Autowired
    private RegistrationService service;

    @Autowired
    private RegistrationRepository registrationRepo;

    @PostMapping("/UserDetails")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User userDetails(@RequestBody UserDetailsRequest userDetailsRequest) {
        User user = service.fetchUserByUsername(userDetailsRequest.getUsername());
        user.setCollegeName(userDetailsRequest.getCollegeName());
        user.setBranch(userDetailsRequest.getBranch());
        user.setSem(userDetailsRequest.getSem());
        user.setGender(userDetailsRequest.getGender());
        user.setBirthdate(userDetailsRequest.getBirthdate());
        user.setBio(userDetailsRequest.getBio());
        user.setBookmarks("");
        user.setNoOfPosts(0);
        registrationRepo.save(user);
        return user;
    }


    @PostMapping("/editPassword")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public User editPassword(@RequestBody EditPasswordRequest editPasswordRequest) throws Exception{

        User user = service.fetchUserByUsername(editPasswordRequest.getUsername());
        System.out.println(getEncodedString(editPasswordRequest.getOldPassword()));
        if(user.getPassword().equals(getEncodedString(editPasswordRequest.getOldPassword()))) {
            if(editPasswordRequest.getNewPassword().equals(editPasswordRequest.getNewConfirmPassword())) {
                user.setPassword(getEncodedString(editPasswordRequest.getNewPassword()));
                user.setConfirmPassword(getEncodedString(editPasswordRequest.getNewConfirmPassword()));
                registrationRepo.save(user);
            }
            else throw new Exception("Password Must Match");
        }
        else throw new Exception("Wrong Password");
        return user;
    }

    private String getEncodedString(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }
}
