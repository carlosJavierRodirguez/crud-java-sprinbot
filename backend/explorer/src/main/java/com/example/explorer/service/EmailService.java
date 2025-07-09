package com.example.explorer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void emailRecoveryPassword(String addressMail, String name, String code) {
        try {

            String subject = "Recuperación de contraseña - Sistema Explorer";

            String bodyMail = String.format(
                    """
                                <!DOCTYPE html>
                                <html lang="es">
                                <head>
                                    <meta charset="UTF-8">
                                    <title>Recuperación de Contraseña</title>
                                </head>
                                <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; margin: 0; padding: 0;">
                                    <table width="100%%" bgcolor="#f0f2f5" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
                                        <tr>
                                            <td align="center">
                                                <table width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                                                    <tr>
                                                        <td bgcolor="#007bff" style="padding: 20px; text-align: center;">
                                                            <h1 style="color: #ffffff; margin: 0;">Sistema Explorer</h1>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 30px;">
                                                            <h2 style="color: #333333;">Hola %s,</h2>
                                                            <p style="color: #555555; font-size: 16px;">
                                                                Hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código de verificación:
                                                            </p>
                                                            <p style="background-color: #e9f5ff; padding: 15px; text-align: center; font-size: 28px; color: #007bff; border-radius: 6px; font-weight: bold; letter-spacing: 2px;">
                                                                %s
                                                            </p>
                                                            <p style="color: #777777; font-size: 14px; margin-top: 20px;">
                                                                Este código es válido durante los próximos <strong>20 minutos</strong>. Si no solicitaste este restablecimiento, puedes ignorar este mensaje.
                                                            </p>
                                                            <p style="color: #999999; font-size: 12px; text-align: center; margin-top: 30px;">
                                                                © 2025 Sistema Explorer. Todos los derechos reservados.
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </body>
                                </html>
                            """,
                    name, code);

            emailSender(addressMail, subject, bodyMail);

        } catch (Exception e) {
            System.out.println("Error al enviar el correo: " + e.getMessage());
        }
    }

    public boolean emailSender(String addresMail, String subject, String bodyMail) throws MessagingException {
        try {
            // Creación del correo
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(addresMail);
            helper.setSubject(subject);
            helper.setText(bodyMail, true);
            javaMailSender.send(message);
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
}
