package com.example.explorer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.explorer.service.UserService;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.User;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/") // solo administrador
    public ResponseEntity<Object> getAllUsers() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user.getRole().getId() != 2) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso denegado. Solo administradores.");
        }

        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/profile")
    public ResponseEntity<Object> profile(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<Object>(userDetails, HttpStatus.OK);
    }

    @DeleteMapping("/{id}") // solo administrador
    public ResponseEntity<Object> deleteUser(@PathVariable int id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (user.getRole().getId() != 2) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso denegado. Solo administradores.");
        }

        responseDTO response = userService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
