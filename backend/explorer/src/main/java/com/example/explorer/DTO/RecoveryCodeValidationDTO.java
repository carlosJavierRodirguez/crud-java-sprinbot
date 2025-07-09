package com.example.explorer.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecoveryCodeValidationDTO {

    private String userName;
    private String code;
    
}
