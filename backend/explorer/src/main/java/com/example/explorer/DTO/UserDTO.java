package com.example.explorer.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.explorer.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @JsonProperty("id")
    private int id;
    private String userName;
    private String email;
    private boolean enabled;
    private String password;
    private Role role;

}
