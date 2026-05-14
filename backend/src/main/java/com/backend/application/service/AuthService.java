package com.backend.application.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.application.dto.AuthResponse;
import com.backend.application.dto.LoginRequest;
import com.backend.application.dto.RegisterRequest;
import com.backend.application.dto.ResetPasswordRequest;
import com.backend.application.dto.UserDto;
import com.backend.application.dto.VerifyOTPRequest;
import com.backend.application.ports.EmailService;
import com.backend.application.ports.JWTUtil;
import com.backend.domain.model.OTPToken;
import com.backend.domain.model.RefreshToken;
import com.backend.domain.model.User;
import com.backend.domain.repository.OTPTokenRepository;
import com.backend.domain.repository.RefreshTokenRepository;
import com.backend.domain.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.backend.domain.model.Role;

@Slf4j
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

        User user = new User(
                false,
                request.getEmail(),
                false,
                null,
                request.getName(),
                passwordEncoder.encode(request.getPassword()), null, null, Role.USER);

        userRepository.save(user);

        sendOtp(request.getEmail());
    }

    @Transactional
    public void sendOtp(String email) {
        String code = String.format("%06d", new SecureRandom().nextInt(1000000));

        OTPToken otp = new OTPToken(
                null,
                email,
                code,
                LocalDateTime.now().plusMinutes(5),
                null);

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

        user.activate();
        log.info("Is activated  : {} " + user.isEnabled());
        userRepository.save(user);
        otpTokenRepository.deleteByEmail(request.getEmail());

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        String refreshToken = generateRefreshToken(user.getEmail());
        return new AuthResponse(accessToken, refreshToken, toDto(user));
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        log.info("User email from DB: {}", user.getEmail());
        log.info("User role from DB: {}", user.getRole());
        log.info("User ID from DB: {}", user.getId());
        if (!user.isEnabled())
            throw new RuntimeException("Please verify your email first ");

        if (user.isBlocked())
            throw new RuntimeException("Your account has been blocked");

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid Credentials");

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());

        log.info("Role of the current user: {}", user.getRole().name());

        String refreshToken = generateRefreshToken(user.getEmail());
        return new AuthResponse(accessToken, refreshToken, toDto(user));
    }

    private String generateRefreshToken(String email) {
        // Don't delete existing tokens - allow multiple refresh tokens per user
        // This prevents issues when users have multiple tabs or sessions
        RefreshToken token = new RefreshToken(
                null,
                UUID.randomUUID().toString(),
                email,
                LocalDateTime.now().plusDays(7));

        return refreshTokenRepository.save(token).getToken();
    }

    public AuthResponse refresh(String refreshToken) {
        // 1. Find the token
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));
        if (token.isExpired(java.time.Clock.systemUTC()))
            throw new RuntimeException("Refresh token expired");
        // 2. Get the User
        User user = userRepository.findByEmail(token.getEmail())
                .orElseThrow(() -> new RuntimeException("User associated with token not found"));
        // 3. Generate new Access Token
        String newAccessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());
        // 4. Return the full bundle (Set refresh token to null here if you like, as
        // it's already in the cookie)
        log.info("DTO role : {}", toDto(user).getRole());
        return new AuthResponse(newAccessToken, null, toDto(user));
    }

    @Transactional
    public void logout(String refreshToken) {
        RefreshToken token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));
        refreshTokenRepository.delete(token); // Delete only the specific token
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

        otp.generateResetToken(resetToken);
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

        user.changePassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        otpTokenRepository.deleteByEmail(otp.getEmail());
    }

    private UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole().name(),
                user.getProfileImage(), user.getPhone());
    }
}
