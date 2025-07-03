package com.example.explorer.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_name", length = 100, nullable = false)
    private String userName;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;

    @Column(nullable = false, length = 100)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    // --- Métodos obligatorios de UserDetails ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getName()));
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Aquí podrías agregar lógica si lo deseas
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Lo mismo: lógica si se bloquean cuentas
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Lógica de expiración de contraseña, si aplicas
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
