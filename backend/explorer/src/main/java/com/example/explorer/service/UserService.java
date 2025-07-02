package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.repository.IUser;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.User;

@Service
public class UserService {

    @Autowired
    private IUser repository;

    // listar todas las columnas
    public List<User> findAll() {
        return repository.findAll();
    }

    // lista segun el id
    public Optional<User> findById(int id) {
        return repository.findById(id);
    }

    // listar segun el nombre
    public Optional<User> findByUserName(String userName) {
        return repository.findByUserName(userName);
    }

    // listar segun el email
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    // borrar por ID
    public responseDTO deleteUser(int id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.");
        }
        repository.deleteById(id);
        return new responseDTO(
                HttpStatus.OK.toString(),
                "Se eliminó correctamente.");
    }

}
