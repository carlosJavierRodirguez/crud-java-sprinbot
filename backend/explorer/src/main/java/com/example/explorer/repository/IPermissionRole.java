package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.PermissionRole;

public interface IPermissionRole extends JpaRepository<PermissionRole, Integer> {

}
