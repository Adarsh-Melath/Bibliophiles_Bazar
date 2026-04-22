package com.backend.infrastructure.oauth;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.backend.domain.model.AuthProvider;
import com.backend.domain.model.RefreshToken;
import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.repository.RefreshTokenRepository;
import com.backend.domain.repository.UserRepository;
import com.backend.infrastructure.security.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

  private final UserRepository userRepository;
  private final RefreshTokenRepository refreshTokenRepository;
  private final JWTUtil jwtUtil;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
    OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

    String email = oAuth2User.getAttribute("email");
    String name = oAuth2User.getAttribute("name");
    String profileImage = oAuth2User.getAttribute("picture");

    User user = userRepository.findByEmail(email).orElseGet(() -> {
      User newUser = new User();

      newUser.setEmail(email);
      newUser.setName(name);
      newUser.setProfileImage(profileImage);
      newUser.setProvider(AuthProvider.GOOGLE);
      newUser.setRole(Role.USER);
      newUser.setEnabled(true); // Google already verified the email

      return userRepository.save(newUser);
    });

    String refreshToken = generateRefreshToken(email);
    ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
        .httpOnly(true)
        .path("/api/auth/refresh")
        .maxAge(7 * 24 * 60 * 60)
        .sameSite("Lax")
        .build();
    response.addHeader("Set-Cookie", cookie.toString());

    String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole().name());

    // Redirect to frontend with tokens
    String frontendUrl = "https://frontend-xi-one-93.vercel.app/oauth2/callback"
        + "?token=" + accessToken;

    response.sendRedirect(frontendUrl);
  }

  public String generateRefreshToken(String email) {
    refreshTokenRepository.deleteByEmail(email);
    RefreshToken token = new RefreshToken();
    token.setToken(UUID.randomUUID().toString());
    token.setEmail(email);
    token.setExpiresAt(LocalDateTime.now().plusDays(7));
    return refreshTokenRepository.save(token).getToken();
  }
}
