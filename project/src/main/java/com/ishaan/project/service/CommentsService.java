package com.ishaan.project.service;


import com.ishaan.project.model.Comments;

public interface CommentsService {
    Iterable<Comments> findByPostId(int id);
}
