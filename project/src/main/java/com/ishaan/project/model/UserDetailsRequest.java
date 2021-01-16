package com.ishaan.project.model;

public class UserDetailsRequest {
    private String username;
    private String collegeName;
    private String branch;
    private String sem;
    private String gender;
    private String birthdate;
    private String bio;

    public UserDetailsRequest(String username, String collegeName, String branch, String sem, String gender, String birthdate, String bio) {
        this.username = username;
        this.collegeName = collegeName;
        this.branch = branch;
        this.sem = sem;
        this.gender = gender;
        this.birthdate = birthdate;
        this.bio = bio;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserDetailsRequest(){

    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSem() {
        return sem;
    }

    public void setSem(String sem) {
        this.sem = sem;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
