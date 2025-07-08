package com.example.explorer.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @JsonProperty("id")
    private int id;

    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(max = 100, message = "El nombre de usuario no debe exceder los 100 caracteres")
    private String userName;

    @Email(message = "El correo no es válido")
    @NotNull(message = "El correo es obligatorio")
    private String email;

    private boolean enabled;

    // No se marca como obligatorio para permitir actualizaciones sin cambiar la
    // contraseña
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @NotNull(message = "El ID del rol es obligatorio")
    private Integer role;
}
