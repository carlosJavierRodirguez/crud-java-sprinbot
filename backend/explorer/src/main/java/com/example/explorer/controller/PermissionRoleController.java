package com.example.explorer.controller;

import java.util.List;
import java.util.Optional;

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

import com.example.explorer.DTO.PermissionRoleDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.PermissionRole;
import com.example.explorer.service.PermissionRoleService;

@RestController
@RequestMapping("/api/v1/permission_role")
public class PermissionRoleController {
    @Autowired
    private PermissionRoleService permissionRoleService;

    @GetMapping("/")
    public ResponseEntity<List<PermissionRole>> getAllPermissionRoles() {
        List<PermissionRole> permissionRoles = permissionRoleService.findAll();
        return new ResponseEntity<>(permissionRoles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPermissionRoleById(@PathVariable int id) {
        Optional<PermissionRole> permissionRole = permissionRoleService.findById(id);
        if (!permissionRole.isPresent()) {
            return new ResponseEntity<>("Permiso de rol no encontrado", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(permissionRole.get(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createPermissionRole(@RequestBody PermissionRoleDTO permissionRoleDTO) {
        responseDTO response = permissionRoleService.save(permissionRoleDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePermissionRole(@PathVariable int id,
            @RequestBody PermissionRoleDTO permissionRoleDTO) {
        responseDTO response = permissionRoleService.updatePermissionRole(id, permissionRoleDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePermissionRole(@PathVariable int id) {
        responseDTO response = permissionRoleService.deletePermissionRole(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
