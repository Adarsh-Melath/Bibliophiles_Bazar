package com.backend.presentation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.application.dto.AddressRequest;
import com.backend.application.dto.AddressResponse;
import com.backend.application.dto.ChangePasswordRequest;
import com.backend.application.dto.UpdateProfileRequest;
import com.backend.application.dto.UserDto;
import com.backend.application.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfiler(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok(userService.getProfile(email));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateProfile(@AuthenticationPrincipal String email,
            @RequestBody @Valid UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateProfile(email, request));
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@AuthenticationPrincipal String email,
            @RequestBody @Valid ChangePasswordRequest request) {
        userService.changePassword(email, request);
        return ResponseEntity.ok("Password Change Successfully");
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<AddressResponse>> getAddresses(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok(userService.getAddresses(email));
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressResponse> addAddress(@AuthenticationPrincipal String email,
            @RequestBody @Valid AddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.addAddress(email, request));
    }

    @PutMapping("/addresses/{id}")
    public ResponseEntity<AddressResponse> updateAddress(@AuthenticationPrincipal String email, @PathVariable Long id,
            @RequestBody @Valid AddressRequest request) {
        return ResponseEntity.ok(userService.updateAddress(email, id, request));
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<String> deleteAddress(@AuthenticationPrincipal String email, @PathVariable Long id) {
        userService.deleteAddress(email, id);
        return ResponseEntity.ok("Address Deleted Successfully");
    }
}
