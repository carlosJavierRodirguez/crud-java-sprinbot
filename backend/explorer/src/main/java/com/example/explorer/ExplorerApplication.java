package com.example.explorer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Base64;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableScheduling
@SpringBootApplication
public class ExplorerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExplorerApplication.class, args);

		// Generar una nueva clave HMAC-SHA256 segura
		// Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

		// Mostrar la clave generada
		// byte[] keyBytes = key.getEncoded();
		// System.out.println("Clave generada: " +
		// Base64.getEncoder().encodeToString(keyBytes));
	}

}
