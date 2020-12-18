package com.ishaan.project.repository;

import com.ishaan.project.model.LikesAndComments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesAndCommentsRepository extends JpaRepository<LikesAndComments, Integer> {


}
