package com.ishaan.project.model;

import com.ishaan.project.validation.ValidEmail;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @NotNull(message = "Enter your first name")
    @Pattern(
            regexp = "^[a-zA-Z_-]{3,30}$",
            message = "Enter valid name"
    )
    private String firstName;

    @NotNull(message = "Enter your last name")
    @Size(min = 3, max = 30)
    private String lastName;

    @ValidEmail
    @NotNull(message = "Enter your email")
    private String username;

    @Size(min = 6, max = 30)
    @NotNull(message = "Enter your password")
    private String password;
    private String confirmPassword;

    private boolean enabled;
    private String roles;

    private String collegeName;
    private String branch;
    private String sem;
    private String gender;
    private String birthdate;
    private String bio;
    @Lob
    @Column(length = 1000)
    private byte[] picByte;

    private String Bookmarks;
    private int noOfPosts;
    private AuthenticationProvider authProvider;

    public User(int id, @NotNull(message = "Enter your first name") @Pattern(regexp = "^[a-zA-Z_-]{3,30}$", message = "Enter valid name") String firstName, @NotNull(message = "Enter your last name") @Size(min = 3, max = 30) String lastName, @NotNull(message = "Enter your email") String username, @Size(min = 6, max = 30) @NotNull(message = "Enter your password") String password, String confirmPassword, boolean enabled, String roles, String collegeName, String branch, String sem, String gender, String birthdate, String bio, byte[] picByte, String bookmarks, int noOfPosts) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.enabled = enabled;
        this.roles = roles;
        this.collegeName = collegeName;
        this.branch = branch;
        this.sem = sem;
        this.gender = gender;
        this.birthdate = birthdate;
        this.bio = bio;
        this.picByte = picByte;
        Bookmarks = bookmarks;
        this.noOfPosts = noOfPosts;
    }

    public User(){

    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
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

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public String getBookmarks() {
        return Bookmarks;
    }

    public void setBookmarks(String bookmarks) {
        Bookmarks = bookmarks;
    }

    public int getNoOfPosts() {
        return noOfPosts;
    }

    public void setNoOfPosts(int noOfPosts) {
        this.noOfPosts = noOfPosts;
    }

    public AuthenticationProvider getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(AuthenticationProvider authProvider) {
        this.authProvider = authProvider;
    }
}


