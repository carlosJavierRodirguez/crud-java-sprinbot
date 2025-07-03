package com.example.explorer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.explorer.repository.IPage;
import com.example.explorer.repository.IPermissionRole;
import com.example.explorer.repository.IRole;

import com.example.explorer.model.PermissionRole;

import com.example.explorer.DTO.responseDTO;
import com.example.explorer.DTO.PermissionRoleDTO;

import com.example.explorer.model.Page;
import com.example.explorer.model.Role;

@Service
public class PermissionRoleService {

    @Autowired
    private IPermissionRole data;

    @Autowired
    private IRole roleRepository;

    @Autowired
    private IPage pageRepository;

    public List<PermissionRole> findAll() {
        return data.findAll();
    }

    public Optional<PermissionRole> findById(int id) {
        return data.findById(id);
    }

    public responseDTO deletePermissionRole(int id) {
        Optional<PermissionRole> permissionRole = findById(id);
        if (!permissionRole.isPresent()) {
            return new responseDTO(HttpStatus.NOT_FOUND.toString(), "El permiso de rol no existe");
        }

        data.deleteById(id);
        return new responseDTO(HttpStatus.OK.toString(), "Permiso de rol eliminado correctamente");
    }

    public responseDTO save(PermissionRoleDTO permissionRoleDTO) {
        PermissionRole permissionRole = convertToModel(permissionRoleDTO);
        data.save(permissionRole);
        return new responseDTO("Permiso de rol guardado correctamente", HttpStatus.OK.toString());
    }

    public responseDTO updatePermissionRole(int id, PermissionRoleDTO permissionRoleDTO) {
        Optional<PermissionRole> permissionRole = findById(id);
        if (!permissionRole.isPresent()) {
            return new responseDTO("El permiso de rol no existe", HttpStatus.NOT_FOUND.toString());
        }

        PermissionRole updatedPermissionRole = permissionRole.get();
        updatedPermissionRole.setPage(permissionRoleDTO.getPage());
        updatedPermissionRole.setRole(permissionRoleDTO.getRole());
        updatedPermissionRole.setType(permissionRoleDTO.getType());

        data.save(updatedPermissionRole);
        return new responseDTO("Permiso de rol actualizado correctamente", HttpStatus.OK.toString());
    }

    public PermissionRoleDTO convertToDTO(PermissionRole permissionRole) {
        PermissionRoleDTO dto = new PermissionRoleDTO();
        dto.setId(permissionRole.getId());
        dto.setPage(permissionRole.getPage());
        dto.setRole(permissionRole.getRole());
        dto.setType(permissionRole.getType());
        return dto;
    }

    public PermissionRole convertToModel(PermissionRoleDTO permissionRoleDTO) {
        Page page = pageRepository.findById(permissionRoleDTO.getPage().getId())
                .orElseThrow(() -> new RuntimeException("Page not found"));
        Role role = roleRepository.findById(permissionRoleDTO.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return new PermissionRole(
                permissionRoleDTO.getId(),
                role,
                page,
                permissionRoleDTO.getType());

    }

}
