package com.ishaan.project.model;

import javax.persistence.*;

@Entity
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int postId;
    private String username;
    //    private String likes;
    private boolean liked;

    @Lob
    @Column(length = 1000)
    private byte[] picByte;
    private String firstName;
    private String lastName;

    public Likes(int id, int postId, String username, boolean liked, byte[] picByte, String firstName, String lastName) {
        this.id = id;
        this.postId = postId;
        this.username = username;
        this.liked = liked;
        this.picByte = picByte;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Likes() {

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

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
