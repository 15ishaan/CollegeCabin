package com.ishaan.project.repository;

import com.ishaan.project.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Posts, Integer>{

    Iterable<Posts> findByBranchAndSemAndColName(String branch, String sem, String colName);
    Iterable<Posts> findByUsername(String username);
    Posts findById(int id);
}
