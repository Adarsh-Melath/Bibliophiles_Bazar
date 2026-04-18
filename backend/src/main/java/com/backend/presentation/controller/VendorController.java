package com.backend.presentation.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.dto.VendorApplicationRequest;
import com.backend.application.dto.VendorApplicationResponse;
import com.backend.application.service.VendorService;
import com.backend.domain.model.ApplicationStatus;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vendor")
public class VendorController {
    private final VendorService vendorService;

    @PostMapping("/apply")
    public ResponseEntity<String> apply(@RequestBody @Valid VendorApplicationRequest request) {
        vendorService.apply(request);
        return ResponseEntity.ok("Application submitted successfully");
    }

    @PostMapping("/applications/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> approve(@PathVariable Long id) {
        vendorService.approve(id);
        return ResponseEntity.ok("Vendor approved");
    }

    @PostMapping("/applications/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> reject(@PathVariable Long id,
            @RequestBody Map<String, String> body) {
        vendorService.reject(id, body.get("reason"));
        return ResponseEntity.ok("Application rejected");
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<VendorApplicationResponse>> getAll() {
        return ResponseEntity.ok(vendorService.getAll());
    }

    @GetMapping("/applications/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<VendorApplicationResponse>> getPending() {
        return ResponseEntity.ok(vendorService.getByStatus(ApplicationStatus.PENDING));
    }

}
