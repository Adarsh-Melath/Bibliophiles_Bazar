package com.backend.application.service;

import java.time.LocalDateTime;
import java.security.SecureRandom;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.application.dto.AuthResponse;
import com.backend.application.dto.LoginRequest;
import com.backend.application.dto.RegisterRequest;
import com.backend.application.dto.ResetPasswordRequest;
import com.backend.application.dto.UserDto;
import com.backend.application.dto.VerifyOTPRequest;
import com.backend.domain.model.AuthProvider;
import com.backend.domain.model.OTPToken;
import com.backend.domain.model.RefreshToken;
import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.repository.OTPTokenRepository;
import com.backend.domain.repository.RefreshTokenRepository;
import com.backend.domain.repository.UserRepository;
import com.backend.infrastructure.email.EmailService;
import com.backend.infrastructure.security.JWTUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final OTPTokenRepository otpTokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("If this email is not registered, you'll receive a verification code");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setProvider(AuthProvider.LOCAL);
        user.setEnabled(false);
        userRepository.save(user);

        sendOtp(request.getEmail());
    }

    @Transactional
    public void sendOtp(String email) {
       String code = String.format("%06d", new SecureRandom().nextInt(1000000));

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

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        String refreshToken = generateRefreshToken(user.getEmail());
        return new AuthResponse(accessToken, refreshToken, toDto(user));
    }

    private UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole().name(),
                user.getProfileImage());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        if (!user.isEnabled())
            throw new RuntimeException("Please verify your email first ");

        if (user.isBlocked())
            throw new RuntimeException("Your account has been blocked");

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid Credentials");

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());

        String refreshToken = generateRefreshToken(user.getEmail());
        return new AuthResponse(accessToken, refreshToken, toDto(user));
    }

    private String generateRefreshToken(String email) {
        refreshTokenRepository.deleteByEmail(email);
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setEmail(email);
        refreshToken.setExpiresAt(LocalDateTime.now().plusDays(7));
        return refreshTokenRepository.save(refreshToken).getToken();
    }

    public String refresh(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (token.isExpired())
            throw new RuntimeException("Refresh token expired");

        return jwtUtil.generateAccessToken(token.getEmail(), userRepository.findByEmail(token.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found ")).getRole().name());
    }

    @Transactional
    public void logout(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
        refreshTokenRepository.deleteByEmail(token.getEmail());
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("If this email is registered, you'll receive a reset code."));
        if (!user.isEnabled())
            throw new RuntimeException("Please complete registration first");

        if (user.isBlocked())
            throw new RuntimeException("Your account has been suspended. Contact support.");

        sendOtp(email);
    }

    public String verifyResetOtp(String email, String code) {
        OTPToken otp = otpTokenRepository.findLatestByEmail(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (otp.isExpired())
            throw new RuntimeException("OTP expired");
        if (!otp.getCode().equals(code)) {
            throw new RuntimeException("Invalid OTP");
        }

        String resetToken = UUID.randomUUID().toString();

        otp.setResetToken(resetToken);
        otpTokenRepository.save(otp);
        return resetToken;
    }

    public void resetPassword(ResetPasswordRequest request) {
        OTPToken otp = otpTokenRepository.findByResetToken(request.getResetToken())
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));
        if (otp.isExpired())
            throw new RuntimeException("OTP expired");
        User user = userRepository.findByEmail(otp.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        
        otpTokenRepository.deleteByEmail(otp.getEmail());
    }
}


