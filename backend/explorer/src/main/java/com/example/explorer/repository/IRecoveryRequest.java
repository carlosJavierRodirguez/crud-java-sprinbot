package com.example.explorer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.explorer.model.RecoveryRequest;
import com.example.explorer.model.User;

public interface IRecoveryRequest extends JpaRepository<RecoveryRequest, Integer> {

    Optional<RecoveryRequest> findTopByUserOrderByCreatedAtDesc(User user);

}
