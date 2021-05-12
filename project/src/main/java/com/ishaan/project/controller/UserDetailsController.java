package com.ishaan.project.controller;

import com.ishaan.project.model.User;
import com.ishaan.project.model.UserDetailsRequest;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
