package com.backend.api;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.backend.application.ports.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class VendorApplicationIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private EmailService emailService;

    @Test
    void apply_then_fetch_application() throws Exception {
        String email = "vendor+" + UUID.randomUUID() + "@example.com";

        mockMvc.perform(post("/api/vendor/apply")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "name", "Vendor Test",
                                "email", email,
                                "phone", "9999999999",
                                "businessName", "Test Books",
                                "businessDescription", "We sell books",
                                "category", "Fiction",
                                "businessRegistrationNumber", "REG-123",
                                "website", "https://example.com",
                                "publishingSince", "2020"))))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/vendor/application")
                        .param("email", email))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email", is(email)))
                .andExpect(jsonPath("$.status", is("PENDING")));
    }
}

