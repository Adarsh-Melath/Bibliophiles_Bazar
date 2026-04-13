package com.backend.application.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.application.dto.AuthResponse;
import com.backend.application.dto.RegisterRequest;
import com.backend.application.dto.UserDto;
import com.backend.application.dto.VerifyOTPRequest;
import com.backend.domain.model.AuthProvider;
import com.backend.domain.model.OTPToken;
import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.repository.OTPTokenRepository;
import com.backend.domain.repository.UserRepository;
import com.backend.infrastructure.email.EmailService;
import com.backend.infrastructure.security.JWTUtil;
import com.nimbusds.openid.connect.sdk.federation.utils.JWTUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OTPTokenRepository otpTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(Role.USER);
        user.setProvider(AuthProvider.LOCAL);
        user.setEnabled(false);
        userRepository.save(user);

        sendOtp(request.getEmail());
    }

    @Transactional
    public void sendOtp(String email) {
        String code = String.format("%06d", new Random().nextInt(999999));

        OTPToken otp = new OTPToken();
        otp.setEmail(email);
        otp.setCode(code);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        otpTokenRepository.deleteByEmail(email);
        otpTokenRepository.save(otp);

        emailService.sendOtp(email, code);
    }

    @Transactional
    public AuthResponse verifyOtp(VerifyOTPRequest request) {
        OTPToken otp = otpTokenRepository.findLatestByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (otp.isExpired())
            throw new RuntimeException("OTP expired");
        if (!otp.getCode().equals(request.getCode()))
            throw new RuntimeException("Invalid OTP");

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setEnabled(true);
        userRepository.save(user);
        otpTokenRepository.deleteByEmail(request.getEmail());

        String token = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());

        return new AuthResponse((token), toDto(user));
    }

    private UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole().name(),
                user.getProfileImage());
    }
}
