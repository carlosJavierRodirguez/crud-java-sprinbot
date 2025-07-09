package com.example.explorer.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.explorer.repository.IUser;

import lombok.RequiredArgsConstructor;

import com.example.explorer.model.RecoveryRequest;
import com.example.explorer.repository.IRecoveryRequest;
import com.example.explorer.model.User;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecoveryService {

    private final IUser userRepository;
    private final IRecoveryRequest recoveryRequestRepository;
    private final EmailService emailService;

    public ResponseEntity<?> generateRecoveryCode(String userName) {

        Optional<User> userOpt = userRepository.findByUserName(userName);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("El usuario no existe");
        }

        User user = userOpt.get();

        // 1. Generar código
        String code = String.valueOf(new Random().nextInt(900000) + 100000);
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(20);

        // 2. Guardar solicitud
        RecoveryRequest request = new RecoveryRequest();
        request.setCode(code);
        request.setExpirationTime(expiration);
        request.setUser(user);
        recoveryRequestRepository.save(request);

        // 3. Enviar correo
        emailService.emailRecoveryPassword(user.getEmail(), user.getUsername(), code);

        return ResponseEntity.ok("Se ha enviado un código de verificación al correo.");
    }

}
