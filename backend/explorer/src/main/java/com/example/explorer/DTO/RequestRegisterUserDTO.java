package com.example.explorer.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestRegisterUserDTO {

    private String userName;
    private String password;
    private String email;
    
}
