package com.ishaan.project.service;

import com.ishaan.project.model.Likes;

public interface LikesService {

    Likes findByUsername(String username);
}
