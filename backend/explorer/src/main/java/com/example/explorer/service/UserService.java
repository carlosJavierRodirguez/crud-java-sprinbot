package com.example.explorer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.explorer.repository.IUser;

import lombok.RequiredArgsConstructor;

import com.example.explorer.DTO.RequestLoginDTO;
import com.example.explorer.DTO.RequestRegisterUserDTO;
import com.example.explorer.DTO.ResponseLogin;
import com.example.explorer.DTO.UserDTO;
import com.example.explorer.DTO.responseDTO;
import com.example.explorer.model.User;
import com.example.explorer.service.JWT.JwtService;
import com.example.explorer.model.Role;

@Service
@RequiredArgsConstructor
public class UserService {

    private final IUser data;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

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
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUsername(),
                        login.getPassword()));
        UserDetails user = data.findByUserName(login.getUsername()).orElseThrow();
        ResponseLogin response = new ResponseLogin(jwtService.getToken(user));
        return response;

    }

    public responseDTO updateUser(int id, UserDTO userDTO) {
        Optional<User> usuario = findById(id);
        if (!usuario.isPresent()) {
            return new responseDTO("El usuario no existe", HttpStatus.NOT_FOUND.toString());
        }

        User updatedUser = usuario.get();
        updatedUser.setUserName(userDTO.getUserName());
        updatedUser.setPassword(userDTO.getPassword());
        updatedUser.setEmail(userDTO.getEmail());
        updatedUser.setEnabled(userDTO.isEnabled());
        updatedUser.setRole(userDTO.getRole());

        data.save(updatedUser);
        return new responseDTO("Usuario actualizado correctamente", HttpStatus.OK.toString());
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
