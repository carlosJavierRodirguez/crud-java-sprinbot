package com.example.explorer.controller.ControllerPublic;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/public/user/")
public class UserPublicController {

    @GetMapping("login/")
    public ResponseEntity<String> login(@RequestBody String request) {
        return new ResponseEntity<String>("end-point public", HttpStatus.OK);
    }

    @PostMapping("register/")
    public ResponseEntity<String> register(@RequestBody String request) {
        return new ResponseEntity<String>("end-point public register", HttpStatus.OK);
    }

}
