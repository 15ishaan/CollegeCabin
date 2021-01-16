package com.ishaan.project.controller;

import com.ishaan.project.model.User;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class profilepicUpload {

    @Autowired
    RegistrationService service;

    @Autowired
    RegistrationRepository repo;

    @PostMapping("/image/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file, @PathVariable String username) throws Exception {
        try {
            User user = service.fetchUserByUsername(username);
            byte[] fileContent = file.getBytes();
            user.setPicByte(fileContent);
            repo.save(user);
            return new ResponseEntity<String>("Image uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

}
