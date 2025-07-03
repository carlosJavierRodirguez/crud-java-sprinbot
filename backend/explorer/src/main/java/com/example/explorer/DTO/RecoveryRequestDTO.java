package com.example.explorer.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.explorer.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RecoveryRequestDTO {

    @JsonProperty("id")
    private int id;
    private String email;
    private String token;
    private long expirationTime;
    private User user;

}
