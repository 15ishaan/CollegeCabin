package com.ishaan.project.service;

import com.ishaan.project.model.Posts;
import com.ishaan.project.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImplem {

    @Autowired
    private PostRepository postRepo;

    public Iterable<Posts> findByBranchAndSemAndColName(String branch, String sem, String colName){
        return postRepo.findByBranchAndSemAndColName(branch, sem, colName);
    }

    public Iterable<Posts> findByUsername(String username){
        return postRepo.findByUsername(username);
    }

    public Posts findById(int id){
        return postRepo.findById(id);
    }
}
