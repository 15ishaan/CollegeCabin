package com.ishaan.project.service;

import com.ishaan.project.model.Likes;

public interface LikesService {

    Likes findByUsername(String username);
    Likes findByPostId(int id);
    Likes findByPostIdAndUsername(int id, String username);
}
