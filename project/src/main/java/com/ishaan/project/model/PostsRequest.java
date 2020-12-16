package com.ishaan.project.model;

public class PostsRequest {

    private String username;
    private String colName;
    private String sem;
    private String branch;
    private String caption;

    public PostsRequest(String username, String colName, String sem, String branch, String caption) {
        this.username = username;
        this.colName = colName;
        this.sem = sem;
        this.branch = branch;
        this.caption = caption;
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

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }
}
