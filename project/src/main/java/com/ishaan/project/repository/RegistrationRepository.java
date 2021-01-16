package com.ishaan.project.repository;

import com.ishaan.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RegistrationRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
}
