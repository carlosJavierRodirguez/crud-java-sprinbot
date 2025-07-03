package com.example.explorer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.explorer.DTO.RoleDTO;
import com.example.explorer.repository.IRole;
import com.example.explorer.model.Role;

import java.util.List;
import java.util.Optional;

import com.example.explorer.DTO.responseDTO;

@Service
public class RoleService {
    @Autowired
    private IRole data;

    public List<Role> findAll() {
        return data.findAll();
    }

    public Optional<Role> findById(int id) {
        return data.findById(id);
    }

    public responseDTO deleteRole(int id) {
        Optional<Role> roleOpt = findById(id);
        if (!roleOpt.isPresent()) {
            return new responseDTO("El rol no existe", HttpStatus.NOT_FOUND.toString());
        }
        data.deleteById(id);
        return new responseDTO("Rol eliminado correctamente", HttpStatus.OK.toString());
    }

    public responseDTO save(RoleDTO roleDTO) {
        Role rol = convertToModel(roleDTO);
        data.save(rol);
        return new responseDTO("Rol guardado correctamente", HttpStatus.OK.toString());
    }

    public responseDTO updateRole(int id, RoleDTO roleDTO) {
        Optional<Role> roleOpt = findById(id);
        if (!roleOpt.isPresent()) {
            return new responseDTO("El rol no existe", HttpStatus.NOT_FOUND.toString());
        }
        Role updatedRole = roleOpt.get();
        updatedRole.setName(roleDTO.getName());
        updatedRole.setDescription(roleDTO.getDescription());

        data.save(updatedRole);
        return new responseDTO("Rol actualizado correctamente", HttpStatus.OK.toString());
    }

    public RoleDTO convertToDTO(Role rol) {
        return new RoleDTO(
                rol.getId(),
                rol.getName(),
                rol.getDescription());
    }

    public Role convertToModel(RoleDTO roleDTO) {
        return new Role(
                0, // Nuevo rol, id generado por BD
                roleDTO.getName(),
                roleDTO.getDescription());
    }
}
