package com.example.explorer.controller.Public;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import com.example.explorer.DTO.RequestRegisterUserDTO;
import com.example.explorer.DTO.ResponseLogin;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.service.UserService;
import com.example.explorer.DTO.ForgotPassword;
import com.example.explorer.DTO.RequestLoginDTO;
import com.example.explorer.service.RecoveryService;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/public/user")
public class UserPublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private RecoveryService recoveryService;

    @PostMapping("/login")
    public ResponseEntity<ResponseLogin> login(@RequestBody RequestLoginDTO userDTO) {
        ResponseLogin response = userService.login(userDTO);
        return new ResponseEntity<ResponseLogin>(response, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgot(@RequestBody ForgotPassword forgot) {
        return recoveryService.generateRecoveryCode(forgot.getUserName());
    }

    @PostMapping("/register")
    public ResponseEntity<Object> saveUser(@RequestBody RequestRegisterUserDTO user) {
        responseDTO response = userService.save(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
