package com.backend.api;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.isEmptyOrNullString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.backend.application.ports.EmailService;
import com.backend.domain.model.OTPToken;
import com.backend.domain.model.User;
import com.backend.domain.repository.OTPTokenRepository;
import com.backend.domain.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthFlowIT {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ObjectMapper objectMapper;

        @Autowired
        private OTPTokenRepository otpTokenRepository;

        @Autowired
        private UserRepository userRepository;

        @MockitoBean
        private EmailService emailService;

        @Test
        void register_verifyOtp_login_happyPath() throws Exception {
                String email = "user+" + UUID.randomUUID() + "@example.com";
                String password = "Password123";

                mockMvc.perform(post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(
                                                Map.of("name", "Test User", "email", email, "password", password))))
                                .andExpect(status().isOk());

                OTPToken otp = otpTokenRepository.findLatestByEmail(email).orElseThrow();
                assertThat(otp.getCode()).isNotBlank();

                mockMvc.perform(post("/api/auth/verifyotp")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(
                                                Map.of("email", email, "code", otp.getCode()))))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.accessToken", not(isEmptyOrNullString())))
                                .andExpect(jsonPath("$.refreshToken", not(isEmptyOrNullString())))
                                .andExpect(jsonPath("$.user.email").value(email));

                User user = userRepository.findByEmail(email).orElseThrow();
                assertThat(user.isEnabled()).isTrue();

                mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(
                                                Map.of("email", email, "password", password))))
                                .andExpect(status().isOk())
                                .andExpect(header().string(HttpHeaders.SET_COOKIE, containsString("refreshToken=")))
                                .andExpect(jsonPath("$.accessToken", not(isEmptyOrNullString())))
                                .andExpect(jsonPath("$.refreshToken").doesNotExist())
                                .andExpect(jsonPath("$.user.email").value(email));
        }
}
