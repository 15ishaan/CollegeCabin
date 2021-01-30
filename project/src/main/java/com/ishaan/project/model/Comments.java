package com.ishaan.project.model;


import javax.persistence.*;

@Entity
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int postId;
    private String username;
//    private String likes;
    private String comments;

    @Lob
    @Column(length = 1000)
    private byte[] picByte;
    private String firstName;
    private String lastName;

    public Comments(int id, int postId, String username /*String likes*/, String comments, byte[] picByte, String firstName, String lastName) {
        this.id = id;
        this.postId = postId;
        this.username = username;
       // this.likes = likes;
        this.comments = comments;
        this.picByte = picByte;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Comments() {

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

//    public String getLikes() {
//        return likes;
//    }
//
//    public void setLikes(String likes) {
//        this.likes = likes;
//    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
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
