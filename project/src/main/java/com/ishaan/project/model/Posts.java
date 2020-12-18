package com.ishaan.project.model;

import javax.persistence.*;

@Entity
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String colName;
    private String sem;
    private String branch;
    private String caption;
    private String subject;
    private String unit;
    private int noOfLikes;
    private int noOfComments;

    @Lob
    @Column(length = 1000)
    private byte[] fileByte;

    public Posts(int id, String username, String colName, String sem, String branch, String caption, String subject, String unit, int noOfLikes, int noOfComments, byte[] fileByte) {
        this.id = id;
        this.username = username;
        this.colName = colName;
        this.sem = sem;
        this.branch = branch;
        this.caption = caption;
        this.subject = subject;
        this.unit = unit;
        this.noOfLikes = 0;
        this.noOfComments = 0;
        this.fileByte = fileByte;
    }

    public Posts() {

    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public byte[] getFileByte() {
        return fileByte;
    }

    public void setFileByte(byte[] fileByte) {
        this.fileByte = fileByte;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getColName() {
        return colName;
    }

    public void setColName(String colName) {
        this.colName = colName;
    }

    public String getSem() {
        return sem;
    }

    public void setSem(String sem) {
        this.sem = sem;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getNoOfLikes() {
        return noOfLikes;
    }

    public void setNoOfLikes(int noOfLikes) {
        this.noOfLikes = noOfLikes;
    }

    public int getNoOfComments() {
        return noOfComments;
    }

    public void setNoOfComments(int noOfComments) {
        this.noOfComments = noOfComments;
    }
}
