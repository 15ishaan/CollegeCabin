package com.ishaan.project.controller;

import com.ishaan.project.model.Comments;
import com.ishaan.project.model.Likes;
import com.ishaan.project.model.Posts;
import com.ishaan.project.model.User;
import com.ishaan.project.repository.CommentsRepository;
import com.ishaan.project.repository.LikesRepository;
import com.ishaan.project.repository.PostRepository;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.PostServiceImplem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Iterator;

@RestController
public class PostsController {

    @Autowired
    private CommentsRepository CommentsRepo;

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private RegistrationRepository userRepo;

    @Autowired
    private PostServiceImplem postService;

    @Autowired
    private LikesRepository likeRepo;

    @PostMapping("/uploadStatus/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> uploadPost(@RequestParam String caption, @PathVariable String username) {
        if (username == null) {
            ResponseEntity.status(404);
            return ResponseEntity.notFound().build();
        } else {
            Posts posts = new Posts();
            posts.setUsername(username);
            posts.setFileType("null");
            posts.setCaption(caption);
            User user = userRepo.findByUsername(username);
            posts.setColName(user.getCollegeName());
            posts.setBranch(user.getBranch());
            posts.setSem(user.getSem());
            posts.setPicByte(user.getPicByte());
            posts.setFirstName(user.getFirstName());
            posts.setLastName(user.getLastName());
            posts.setBookmarked(false);
            user.setNoOfPosts(user.getNoOfPosts()+1);
            userRepo.save(user);
            postRepo.save(posts);
            ResponseEntity.status(200);
            return ResponseEntity.ok("Post has been uploaded");
        }
    }

    @PostMapping("/uploadPost/file/{username}/{fileType}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> uploadPost(@RequestParam("file") MultipartFile file, @RequestParam("caption") String caption, @PathVariable("fileType") String fileType, @PathVariable("username") String username) throws Exception {
        //  System.out.println("ko0");
        if (username == null) {
            ResponseEntity.status(404);
            return ResponseEntity.notFound().build();
        } else {
            Posts posts = new Posts();
            posts.setUsername(username);
            posts.setFileType(fileType);
            posts.setCaption(caption);
            User user = userRepo.findByUsername(username);
            posts.setColName(user.getCollegeName());
            posts.setBranch(user.getBranch());
            posts.setSem(user.getSem());
            posts.setPicByte(user.getPicByte());
            posts.setFirstName(user.getFirstName());
            posts.setLastName(user.getLastName());
            posts.setBookmarked(false);
            try {
                byte[] fileContent = file.getBytes();
                posts.setFileByte(fileContent);
                postRepo.save(posts);
                user.setNoOfPosts(user.getNoOfPosts()+1);
                userRepo.save(user);
                ResponseEntity.status(200);
                return ResponseEntity.ok("Post has been uploaded");
            } catch (Exception e) {
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
            }

        }
    }

    @GetMapping("/allPost/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Iterable<Posts> showAllPosts(@PathVariable String username) {
        User user = userRepo.findByUsername(username);
        Iterable<Posts> posts = postService.findByBranchAndSemAndColName(user.getBranch(), user.getSem(), user.getCollegeName());
        return editPosts(posts, username, 1);

    }

    @GetMapping("/myPost/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Iterable<Posts> showMyPosts(@PathVariable String username) {
        Iterable<Posts> posts = postService.findByUsername(username);
        return editPosts(posts, username, 0);
    }

    @PostMapping("/addLike/{username}/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public int addLike(@PathVariable("username") String username, @PathVariable("postId") int id) {
        Likes likes = likeRepo.findByPostIdAndUsername(id, username);
        if(likes == null) likes = new Likes();
        User user = userRepo.findByUsername(username);
        likes.setPicByte(user.getPicByte());
        likes.setFirstName(user.getFirstName());
        likes.setLastName(user.getLastName());
        likes.setPostId(id);
        likes.setUsername(username);
        likes.setLiked(true);
        likeRepo.save(likes);
        Posts posts = postRepo.findById(id);
        posts.setNoOfLikes(posts.getNoOfLikes() + 1);
        postRepo.save(posts);
        return posts.getNoOfLikes();
    }

    @PostMapping("/removeLike/{username}/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public int removeLike(@PathVariable("username") String username, @PathVariable("postId") int id) {
        Likes likes = likeRepo.findByPostIdAndUsername(id, username);
        likes.setLiked(false);
        likeRepo.save(likes);
        Posts posts = postRepo.findById(id);
        posts.setNoOfLikes(posts.getNoOfLikes() - 1);
        postRepo.save(posts);
        return posts.getNoOfLikes();
    }

    @PostMapping("/addComment/{username}/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public int addComment(@PathVariable("username") String username, @PathVariable("postId") int id, @RequestParam("comment") String comment) {
        Comments Comments = new Comments();
        User user = userRepo.findByUsername(username);
        Comments.setPicByte(user.getPicByte());
        Comments.setFirstName(user.getFirstName());
        Comments.setLastName(user.getLastName());
        Comments.setPostId(id);
        Comments.setUsername(username);
        Comments.setComments(comment);
        CommentsRepo.save(Comments);
        Posts posts = postRepo.findById(id);
        posts.setNoOfComments(posts.getNoOfComments() + 1);
        postRepo.save(posts);
        return posts.getNoOfComments();
    }

    @PostMapping("/showComments/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Iterable<Comments> showComments(@PathVariable("postId") int id){
        return CommentsRepo.findByPostId(id);
    }

    @PostMapping("/showLikes/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Likes showLikes(@PathVariable("postId") int id){
        return likeRepo.findByPostId(id); }

   /* public ResponseEntity<?> uploadFile(MultipartFile file, Posts posts){
        try{
            byte[] fileContent = file.getBytes();
            posts.setFileByte(fileContent);
            postRepo.save(posts);
            ResponseEntity.status(200);
            return ResponseEntity.ok("File has been uploaded");
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }
    */

    @GetMapping("/post/{postId}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Posts showPostWithId(@PathVariable("postId") int id) {
        return postService.findById(id);
    }

    public Iterable<Posts> editPosts(Iterable<Posts> posts, String username, int flag)
    {
        Iterator<Posts> it = posts.iterator();
        User user = userRepo.findByUsername(username);
        while(it.hasNext())
        {
            Posts post = it.next();
            Likes likes = likeRepo.findByPostIdAndUsername(post.getId(), username);
            if(likes == null || likes.isLiked() == false) post.setLiked(false);
            else post.setLiked(true);
            
            String pId = String.valueOf(post.getId());
            String str = user.getBookmarks();
            int l = 0, c = 0;

            if(str == null) {
                l = 0;
                c = 0;
            }
            else{
                l = str.length();
                c = 0;
            }
            String s = "";

            //checking if product already exists
            for (int i = 0; i < l; i++){
                if(str.charAt(i) == ';'){
                    if(s.equals(pId)){
                        s = "";
                        c = 1;
                        break;
                    }
                    else{
                        s = "";
                    }
                }
                else{
                    s += str.charAt(i);
                }
            }

            //if Yes
            if(c == 1){
                post.setBookmarked(true);
            }
            
            // if No
            else {
                post.setBookmarked(false);
            }
            postRepo.save(post);
        }
        if(flag == 0){
            return postService.findByUsername(username);
        }
        return postService.findByBranchAndSemAndColName(user.getBranch(), user.getSem(), user.getCollegeName());
    }
}