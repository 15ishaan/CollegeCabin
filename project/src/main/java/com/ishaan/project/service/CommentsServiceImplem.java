package com.ishaan.project.service;

import com.ishaan.project.model.Comments;
import com.ishaan.project.repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentsServiceImplem {

    @Autowired
    private CommentsRepository repo;

    public Iterable<Comments> findByPostId(int id){
        return repo.findByPostId(id);
    }
}
