package com.ishaan.project.repository;

import com.ishaan.project.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Posts, Integer>{

    Posts findByUsername(String username);

}
