package com.exam.service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class userServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());
        if(local!=null)
        {
            System.out.println("User is already there!!");
            throw new Exception("User already present!!");
        }
        else{
            //create user
            for(UserRole ur:userRoles){
                roleRepository.save(ur.getRole());
            }
            Set<UserRole> A = user.getUserRoles();
                    A.addAll(userRoles);
            local=this.userRepository.save(user);
        }
        return local;
    }

    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public Optional<User> updateUser(Long userId, User user) {
        Optional<User> new_user=this.userRepository.findById(userId);
        if (new_user!=null){
            User _user=new_user.get();
            _user.setUsername(user.getUsername());
            _user.setFirstName(user.getFirstName());
            _user.setLastName(user.getLastName());
            _user.setEmail(user.getEmail());
            _user.setProfile(user.getProfile());
            _user.setPassword(user.getProfile());
            _user.setPhone(user.getPhone());
            _user.setEnabled(user.isEnabled());

            this.userRepository.save(_user);
        }
        else{
            System.out.println("User Not found!!");
        }
        return new_user;
    }

}
