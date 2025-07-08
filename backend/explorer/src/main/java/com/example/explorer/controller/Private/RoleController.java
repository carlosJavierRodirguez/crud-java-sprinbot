package com.example.explorer.controller.Private;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.Role;
import com.example.explorer.service.RoleService;

import com.example.explorer.DTO.RoleDTO;

@RestController
@RequestMapping("/api/v1/role")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping("/")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.findAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getRoleById(@PathVariable int id) {
        Optional<Role> rol = roleService.findById(id);
        if (!rol.isPresent()) {
            return new ResponseEntity<>("Rol no encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rol.get(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createRole(@RequestBody RoleDTO roleDTO) {
        responseDTO response = roleService.save(roleDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateRole(@PathVariable int id, @RequestBody RoleDTO roleDTO) {
        responseDTO response = roleService.updateRole(id, roleDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRole(@PathVariable int id) {
        responseDTO response = roleService.deleteRole(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
