package com.backend.presentation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.dto.AdminUserResponse;
import com.backend.application.dto.UpdateProfileRequest;
import com.backend.application.service.AdminService;
import com.backend.domain.model.pagination.PageResult;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PageResult<AdminUserResponse>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(adminService.getUsers(search, role, page, size));
    }

    @PutMapping("/users/{id}/toggle-block")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> toggleBlock(@PathVariable Long id) {
        adminService.toggleBlock(id);
        return ResponseEntity.ok("User block status updated");
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody @Valid UpdateProfileRequest request) {
        adminService.updateUser(id, request);
        return ResponseEntity.ok("User updated successfully");
    }
}
