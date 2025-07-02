package com.example.explorer.controller.ControllerPrivate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user/")
public class UserController {

    @PostMapping("profile/")
    public ResponseEntity<String> profile(@RequestBody String request) {
        return new ResponseEntity<String>("end-point private profile", HttpStatus.OK);
    }
}
