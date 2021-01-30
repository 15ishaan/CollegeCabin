package com.ishaan.project.service;

import com.ishaan.project.model.Likes;
import com.ishaan.project.repository.LikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikesServiceImplem {

    @Autowired
    private LikesRepository repo;

    public Likes findByUsername(String username){
        return repo.findByUsername(username);
    }
}
