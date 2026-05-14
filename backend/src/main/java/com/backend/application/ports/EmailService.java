package com.backend.application.ports;

public interface EmailService {
    public void sendOtp(String toEmail, String otp);

    public void sendVendorApplicationConfirmation(String name, String toEmail);

    public void sendVendorApprovalEmail(String name, String toEmail, String tempPassword);

    public void sendVendorRejectionEmail(String name, String toEmail, String reason);
}
