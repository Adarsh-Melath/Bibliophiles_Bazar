package com.backend.infrastructure.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendOtp(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("The Bibliophile's Bazar -  Email verification");
        message.setText("Your OTP for email verification is: " + otp);
        mailSender.send(message);
    }

    public void sendVendorApplicationConfirmation(String name, String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Bibliophile's Bazar — Application Received");
        message.setText("Hi " + name + ",\n\nThank you for applying to become a vendor on Bibliophile's Bazar. "
                + "We have received your application and will review it shortly.\n\nThe Bibliophile's Bazar Team");

        mailSender.send(message);
    }

    public void sendVendorApprovalEmail(String name, String toEmail, String tempPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Bibliophile's Bazar — Vendor Account Created");
        message.setText("Hi " + name + ",\n\nYour vendor account has been created successfully. "
                + "You can now log in to your account using the following credentials:\n\nUsername: " + toEmail
                + "\nPassword: " + tempPassword + "\n\nThe Bibliophile's Bazar Team");
        mailSender.send(message);
    }

    public void sendVendorRejectionEmail(String name, String toEmail, String reason) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Bibliophile's Bazar — Vendor Application Update");
        message.setText("Hi " + name + ",\n\nWe regret to inform you that your vendor application has been rejected. "
                + "Reason: " + reason
                + "\n\nThank you for your interest in becoming a vendor on Bibliophile's Bazar.\n\nThe Bibliophile's Bazar Team");
        mailSender.send(message);
    }
}
