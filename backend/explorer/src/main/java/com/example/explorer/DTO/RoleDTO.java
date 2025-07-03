package com.example.explorer.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoleDTO {

    @JsonProperty("id")
    private int id;
    private String name;
    private String description;
    
}
