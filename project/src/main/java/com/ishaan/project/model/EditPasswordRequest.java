package com.ishaan.project.model;

public class EditPasswordRequest {

    private String username;
    private String oldPassword;
    private String newPassword;
    private String newConfirmPassword;

    public EditPasswordRequest(String username, String oldPassword, String newPassword, String newConfirmPassword) {
        this.username = username;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.newConfirmPassword = newConfirmPassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewConfirmPassword() {
        return newConfirmPassword;
    }

    public void setNewConfirmPassword(String newConfirmPassword) {
        this.newConfirmPassword = newConfirmPassword;
    }
}
