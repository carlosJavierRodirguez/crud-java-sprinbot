package com.example.explorer.config.init;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.explorer.repository.IRole;
import com.example.explorer.model.Role;

import java.util.List;

@Component
public class RoleDataInitializer implements CommandLineRunner {

    private final IRole roleRepository;

    public RoleDataInitializer(IRole roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            List<Role> defaultRoles = List.of(
                    new Role(0, "USER", "Usuario estándar del sistema"),
                    new Role(0, "ADMIN", "Administrador del sistema"));
            roleRepository.saveAll(defaultRoles);
            
            System.out.println("Roles por defecto insertados.");
        }
    }
}
