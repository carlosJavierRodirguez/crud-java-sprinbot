package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.explorer.model.Role;

public interface IRole extends JpaRepository<Role, Integer> {

}
