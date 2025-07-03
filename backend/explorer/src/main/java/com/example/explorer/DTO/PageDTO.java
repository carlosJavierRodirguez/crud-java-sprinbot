package com.example.explorer.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageDTO {

    private int id;
    private String name;
    private String path;
    private String description;
    
}
