package com.example.explorer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.User;

public interface IUser extends JpaRepository<User, Integer> {

    Optional<User> findByUserName(String username);

    Optional<User> findByEmail(String email);

    List<User> findAllByEnabled(boolean enabled);

}
