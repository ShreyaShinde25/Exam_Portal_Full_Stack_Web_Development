package com.exam.model;

public class JwtRequest {
    //this class is created to accept username and password and if the credentials are valid, class JwtResponse will send a token
    String username;
    String password;

    public JwtRequest(String username, String password) {
        this.username = username;
        this.password = password;
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

    public void setPassword(String password) {
        this.password = password;
    }
}
