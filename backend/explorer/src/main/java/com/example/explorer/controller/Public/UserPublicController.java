package com.example.explorer.controller.Public;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.example.explorer.DTO.RequestRegisterUserDTO;
import com.example.explorer.DTO.ResponseLogin;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.service.UserService;
import com.example.explorer.DTO.RequestLoginDTO;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/public/user")
public class UserPublicController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ResponseLogin> login(@RequestBody RequestLoginDTO userDTO) {
        ResponseLogin response = userService.login(userDTO);
        return new ResponseEntity<ResponseLogin>(response, HttpStatus.OK);
    }

    // @PostMapping("/forgot") // falta desarrollar
    // public ResponseEntity<Object> forgot(@RequestBody UserDTO userDTO) {
    // responseDTO response = userService.save(userDTO);
    // return new ResponseEntity<>(response, HttpStatus.OK);
    // }

    @PostMapping("/register")
    public ResponseEntity<Object> saveUser(@RequestBody RequestRegisterUserDTO user) {
        responseDTO response = userService.save(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
