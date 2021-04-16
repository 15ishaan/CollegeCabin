package com.ishaan.project.repository;

import com.ishaan.project.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
    Likes findByUsername(String username);
    Likes findByPostId(int id);
    Likes findByPostIdAndUsername(int id, String username);
}
