package com.backend.presentation.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.dto.AuthResponse;
import com.backend.application.dto.LoginRequest;
import com.backend.application.dto.RegisterRequest;
import com.backend.application.dto.VerifyOTPRequest;
import com.backend.application.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.OK).body("Registration successful. Check your email for OTP.");
    }

    @PostMapping("/verifyotp")
    public ResponseEntity<AuthResponse> verfiyOtp(@RequestBody @Valid VerifyOTPRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.verifyOtp(request));
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestBody Map<String, String> body) {
        authService.sendOtp(body.get("email"));
        return ResponseEntity.status(HttpStatus.OK).body("OTP resent successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(request));
    }
}
