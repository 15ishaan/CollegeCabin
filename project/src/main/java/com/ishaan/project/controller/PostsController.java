package com.ishaan.project.controller;

import com.ishaan.project.model.LikesAndComments;
import com.ishaan.project.model.Posts;
import com.ishaan.project.model.User;
import com.ishaan.project.repository.LikesAndCommentsRepository;
import com.ishaan.project.repository.PostRepository;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.PostServiceImplem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PostsController {


    @Autowired
    private LikesAndCommentsRepository likesAndCommentsRepo;

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private RegistrationRepository userRepo;

    @Autowired
    private PostServiceImplem postService;

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

    @GetMapping("/allPost/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Iterable<Posts> showAllPosts(@PathVariable String username)
    {
        User user = userRepo.findByUsername(username);
        return postService.findByBranchAndSemAndColName(user.getBranch(), user.getSem(), user.getCollegeName());
    }

    @GetMapping("/myPost/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Iterable<Posts> showMyPosts(@PathVariable String username)
    {
        return postService.findByUsername(username);
    }

    @PostMapping("/addLike/{username}/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public int addLike(@PathVariable("username") String username, @PathVariable("postId") int id)
    {
        LikesAndComments likesAndComments = new LikesAndComments();
        likesAndComments.setPostId(id);
        likesAndComments.setUsername(username);
        likesAndComments.setLikes("liked");
        likesAndCommentsRepo.save(likesAndComments);
        Posts posts = postRepo.findById(id);
        posts.setNoOfLikes(posts.getNoOfLikes()+1);
        postRepo.save(posts);
        return posts.getNoOfLikes();
    }

    @PostMapping("/addComment/{username}/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public int addComment(@PathVariable("username") String username, @PathVariable("postId") int id, @RequestBody String comment)
    {
        LikesAndComments likesAndComments = new LikesAndComments();
        likesAndComments.setPostId(id);
        likesAndComments.setUsername(username);
        likesAndComments.setComments(comment);
        likesAndCommentsRepo.save(likesAndComments);
        Posts posts = postRepo.findById(id);
        posts.setNoOfComments(posts.getNoOfComments()+1);
        postRepo.save(posts);
        return posts.getNoOfComments();
    }
}