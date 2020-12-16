package com.ishaan.project.controller;

import com.ishaan.project.model.Posts;
import com.ishaan.project.model.User;
import com.ishaan.project.repository.PostRepository;
import com.ishaan.project.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PostsController {

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private RegistrationRepository userRepo;

    @PostMapping("/uploadPost")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> uploadPost(@RequestBody Posts posts) {
        if (posts.getUsername() == null) {
            ResponseEntity.status(404);
            return ResponseEntity.notFound().build();
        } else {
            User user = userRepo.findByUsername(posts.getUsername());
            posts.setColName(user.getCollegeName());
            posts.setBranch(user.getBranch());
            posts.setSem(user.getSem());
            postRepo.save(posts);
            ResponseEntity.status(200);
            return ResponseEntity.ok("Post has been uploaded");
        }


    }

    @PostMapping("/uploadPost/file/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String username) throws Exception {
        try {
            Posts posts = new Posts();
            User user = userRepo.findByUsername(username);
            posts.setUsername(username);
            posts.setColName(user.getCollegeName());
            posts.setBranch(user.getBranch());
            posts.setSem(user.getSem());
            byte[] fileContent = file.getBytes();
            posts.setFileByte(fileContent);
            postRepo.save(posts);
            ResponseEntity.status(200);
            return ResponseEntity.ok("Post has been uploaded");
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }

    }
}