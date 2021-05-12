package com.ishaan.project.repository;

import com.ishaan.project.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comments, Integer> {
    Iterable<Comments> findByPostId(int id);
    Iterable<Comments> findByUsername(String username);

}
