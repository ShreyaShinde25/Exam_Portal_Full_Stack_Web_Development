package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.Optional;
import java.util.Set;

public interface UserService {
    //creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user by username
    public User getUser(String username);

    //delete user
    public void deleteUser(Long userId);

    //update user
    public Optional<User> updateUser(Long userId, User user);
}
