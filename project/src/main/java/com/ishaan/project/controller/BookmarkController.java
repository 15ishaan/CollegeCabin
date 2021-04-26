package com.ishaan.project.controller;

import com.ishaan.project.model.User;
import com.ishaan.project.repository.RegistrationRepository;
import com.ishaan.project.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

public class BookmarkController {

    @Autowired
    private RegistrationService service;

    @Autowired
    private RegistrationRepository userRepo;

    @PostMapping("/addBookmark/{postId}/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<String> addBookmark(@PathVariable("postId") int id, @PathVariable("username") String username){

        User user = service.fetchUserByUsername(username);
        user.setBookmarks(user.getBookmarks() + id + ";");
        userRepo.save(user);

        return stringToList(user.getBookmarks());
    }

    @GetMapping("/myBookmarks/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<List<String>> myBookmarks(@PathVariable String username){
        User user = service.fetchUserByUsername(username);

        List<String> list = stringToList(user.getBookmarks());
        return new ResponseEntity<List<String>>(list, HttpStatus.OK);
    }

    @PostMapping("/removeFromBookmark/{postId}/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<String> removeFromBookmark(@PathVariable("postId") int id, @PathVariable("username") String username){

        User user = service.fetchUserByUsername(username);
        String pId = String.valueOf(id);

        //finding product in Bookmarks and removing it
        String str = user.getBookmarks();
        int l = str.length();
        String s = "", str1 = "";
        List<String> list = new ArrayList<>();
        for (int i = 0; i < l; i++){
            if(str.charAt(i) == ';'){
                if(s.equals(pId)){
                    s = "";
                }
                else{
                    str1 += s + ";";
                    s = "";
                }
            }
            else{
                s += str.charAt(i);
            }
        }
        user.setBookmarks(str1);
        userRepo.save(user);
        return stringToList(user.getBookmarks());
    }

    @PostMapping("/doesPostExist/{postId}/{username}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public boolean doesPostExist(@PathVariable("postId") int id, @PathVariable("username") String username){

        User user = service.fetchUserByUsername(username);
        String pId = String.valueOf(id);

        //checking if product already exists
        String str = user.getBookmarks();
        int l = str.length(), c = 0;
        String s = "";
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
            return true;
        }
        // if No
        else {
            return false;
        }
    }

    public List<String> stringToList(String str){
        int l = str.length();
        String s = "";
        List<String> list = new ArrayList<>();
        for (int i = 0; i < l; i++){
            if(str.charAt(i) == ';'){
                list.add(s);
                s = "";
            }
            else{
                s += str.charAt(i);
            }
        }
        return list;
    }
}
