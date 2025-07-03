package com.example.explorer.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.explorer.model.Page;
import com.example.explorer.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PermissionRoleDTO {

    @JsonProperty("id")
    private int id;
    private Role role;
    private Page page;
    private String type;

}
