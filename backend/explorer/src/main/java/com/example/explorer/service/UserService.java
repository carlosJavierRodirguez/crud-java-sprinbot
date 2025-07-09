package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.explorer.repository.IUser;

import lombok.RequiredArgsConstructor;

import com.example.explorer.DTO.ChangePasswordDTO;
import com.example.explorer.DTO.RequestLoginDTO;
import com.example.explorer.DTO.RequestRegisterUserDTO;
import com.example.explorer.DTO.ResponseLogin;
import com.example.explorer.DTO.UserDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.User;
import com.example.explorer.service.JWT.JwtService;
import com.example.explorer.model.Role;
import com.example.explorer.repository.IRole;

@Service
@RequiredArgsConstructor
public class UserService {
    private final IUser data;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private IUser userRepository;

    @Autowired
    private IRole roleRepository;

    public List<User> findAll() {
        return data.findAll();
    }

    public Optional<User> findById(int id) {
        return data.findById(id);
    }

    public Optional<User> findByUserName(String username) {
        return data.findByUserName(username);
    }

    public Optional<User> findByEmail(String Email) {
        return data.findByEmail(Email);
    }

    public responseDTO deleteUser(int id) {
        Optional<User> usuario = findById(id);
        if (!usuario.isPresent()) {
            return new responseDTO("El usuario no existe", HttpStatus.NOT_FOUND.toString());
        }

        data.deleteById(id);
        return new responseDTO("Usuario eliminado correctamente", HttpStatus.OK.toString());
    }

    public responseDTO save(RequestRegisterUserDTO userDTO) {
        User usuario = convertToModelRegister(userDTO);
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        data.save(usuario);
        return new responseDTO("Usuario guardado correctamente", HttpStatus.OK.toString());
    }

    public ResponseLogin login(RequestLoginDTO login) {
        // Autentica credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUserName(),
                        login.getPassword()));

        // Busca el usuario completo
        User user = data.findByUserName(login.getUserName())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        // Genera el token con los claims personalizados
        String token = jwtService.generateToken(user);

        return new ResponseLogin(token);
    }

    public ResponseEntity<?> updateUser(int id, UserDTO userDTO, User currentUser) {

        Optional<User> userOpt = userRepository.findById(id);

        if (currentUser.getRole().getId() != 2 && currentUser.getId() != id) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new responseDTO("No tienes permiso para modificar a otros usuarios", "403"));
        }

        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new responseDTO("El usuario no existe", "404"));
        }

        User user = userOpt.get();

        if (!user.getEmail().equals(userDTO.getEmail())) {
            Optional<User> existing = userRepository.findByEmail(userDTO.getEmail());
            if (existing.isPresent() && existing.get().getId() != user.getId()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new responseDTO("El correo ya está en uso", "409"));
            }
            user.setEmail(userDTO.getEmail());
        }

        if (userDTO.getUserName() != null && !userDTO.getUserName().isBlank()) {
            user.setUserName(userDTO.getUserName());
        }

        user.setEnabled(userDTO.isEnabled());

        if (currentUser.getRole().getId() == 2) {
            Optional<Role> roleOpt = roleRepository.findById(userDTO.getRole());
            if (!roleOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new responseDTO("El rol no existe", "404"));
            }
            user.setRole(roleOpt.get());
        }

        if (userDTO.getPassword() != null && !userDTO.getPassword().isBlank()) {
            String encoded = passwordEncoder.encode(userDTO.getPassword());
            user.setPassword(encoded);
        }

        userRepository.save(user);

        // Si el usuario se está actualizando a sí mismo → nuevo token
        if (currentUser.getId() == id) {
            String newToken = jwtService.generateToken(user);
            return ResponseEntity.ok(new ResponseLogin(newToken));
        }

        return ResponseEntity.ok(new responseDTO("Usuario actualizado correctamente", "200"));
    }

    public ResponseEntity<?> changePassword(User currentUser, ChangePasswordDTO dto) {
        if (dto.getNewPassword() == null || dto.getNewPassword().isBlank()) {
            return ResponseEntity.badRequest().body("La nueva contraseña no puede estar vacía.");
        }

        String encodedPassword = passwordEncoder.encode(dto.getNewPassword());
        currentUser.setPassword(encodedPassword);
        userRepository.save(currentUser);

        return ResponseEntity.ok("Contraseña actualizada correctamente.");
    }

    public User convertToModelRegister(RequestRegisterUserDTO usuario) {
        Role rol = new Role();
        // asignamos rol por defecto
        // registrar el rol 1 como usuario estandar
        rol.setId(1);
        return new User(
                0,
                usuario.getUserName(),
                usuario.getEmail(),
                true,
                usuario.getPassword(),
                rol);
    }

    public User convertToModel(UserDTO userDTO) {
        Role rol = new Role();
        // rol por defecto, recordar registrar en base datos este como rol default
        rol.setId(1);

        return new User(
                0,
                userDTO.getUserName(),
                userDTO.getEmail(),
                userDTO.isEnabled(),
                userDTO.getPassword(),
                rol);
    }

}
