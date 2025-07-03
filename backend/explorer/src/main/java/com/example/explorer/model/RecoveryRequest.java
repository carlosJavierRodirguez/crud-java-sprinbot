package com.example.explorer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "recovery_request")
public class RecoveryRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(name = "expiration_time", nullable = false)
    private long expirationTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
