package com.ishaan.project.controller;

import com.ishaan.project.model.Comments;
import com.ishaan.project.model.Posts;
import com.ishaan.project.model.User;
import com.ishaan.project.repository.CommentsRepository;
import com.ishaan.project.repository.PostRepository;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Iterator;

@RestController
public class profilepicUpload {

    @Autowired
    RegistrationService service;

    @Autowired
    RegistrationRepository repo;

    @Autowired
    CommentsRepository commentsRepo;

    @Autowired
    PostRepository postRepo;

    @PostMapping("/image/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file, @PathVariable String username) throws Exception {
        try {
            User user = service.fetchUserByUsername(username);
            byte[] fileContent = file.getBytes();
            user.setPicByte(fileContent);
            repo.save(user);
            Iterable<Comments> comments = commentsRepo.findByUsername(username);
            Iterable<Posts> posts = postRepo.findByUsername(username);
            update(comments, posts, user);
            return new ResponseEntity<String>("Image uploaded successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    void update(Iterable<Comments> comments, Iterable<Posts> posts, User user){
        Iterator<Comments> itc = comments.iterator();
        while(itc.hasNext()) {
            Comments comment = itc.next();
            comment.setPicByte(user.getPicByte());
            commentsRepo.save(comment);
        }
        Iterator<Posts> it = posts.iterator();
        while(it.hasNext()) {
            Posts post = it.next();
            post.setPicByte(user.getPicByte());
            postRepo.save(post);
        }
    }
}
