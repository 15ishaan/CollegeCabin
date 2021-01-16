package com.ishaan.project.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LikesAndComments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int postId;
    private String username;
    private String likes;
    private String comments;

    public LikesAndComments(int id, int postId, String username, String likes, String comments) {
        this.id = id;
        this.postId = postId;
        this.username = username;
        this.likes = likes;
        this.comments = comments;
    }

    public LikesAndComments() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getLikes() {
        return likes;
    }

    public void setLikes(String likes) {
        this.likes = likes;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
