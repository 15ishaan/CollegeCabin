package com.ishaan.project.service;

import com.ishaan.project.model.Posts;
import org.springframework.validation.annotation.Validated;

@Validated
public interface PostService {
    Iterable<Posts> findByBranchAndSemAndColName(String branch, String sem, String colName);
    Iterable<Posts> findByUsername(String username);
    Posts findById(int id);
}
