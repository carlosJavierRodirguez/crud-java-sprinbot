package com.example.explorer.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.RecoveryRequest;

public interface IRecoveryRequest extends JpaRepository<RecoveryRequest, Integer> {

}
