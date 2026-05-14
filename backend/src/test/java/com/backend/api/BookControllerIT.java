package com.backend.api;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.isEmptyOrNullString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.backend.application.ports.JWTUtil;
import com.backend.domain.model.AuthProvider;
import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @Test
    void vendor_can_add_and_list_books() throws Exception {
        String vendorEmail = "vendor+" + UUID.randomUUID() + "@example.com";

        User vendor = new User(
                false,
                vendorEmail,
                true,
                null,
                null,
                null,
                null,
                null,null);

        userRepository.save(vendor);

        String token = jwtUtil.generateAccessToken(vendorEmail, "VENDOR");

        MvcResult created = mockMvc.perform(post("/api/vendor/books")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Map.of(
                        "title", "Clean Architecture",
                        "author", "Robert C. Martin",
                        "isbn", "9780134494166",
                        "category", "Software",
                        "description", "Architecture & design principles",
                        "price", new BigDecimal("599.00"),
                        "stock", 10,
                        "publishedDate", "2026-01-01"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.title", is("Clean Architecture")))
                .andExpect(jsonPath("$.status", not(isEmptyOrNullString())))
                .andReturn();

        JsonNode body = objectMapper.readTree(created.getResponse().getContentAsString());
        long bookId = body.get("id").asLong();

        mockMvc.perform(get("/api/vendor/books")
                .header("Authorization", "Bearer " + token)
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id", is((int) bookId)))
                .andExpect(jsonPath("$.content[0].title", is("Clean Architecture")));
    }
}
