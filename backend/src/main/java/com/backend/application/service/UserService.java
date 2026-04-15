package com.backend.application.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.application.dto.AddressRequest;
import com.backend.application.dto.AddressResponse;
import com.backend.application.dto.ChangePasswordRequest;
import com.backend.application.dto.UpdateProfileRequest;
import com.backend.application.dto.UserDto;
import com.backend.domain.model.Address;
import com.backend.domain.model.User;
import com.backend.domain.repository.AddressRepository;
import com.backend.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDto getProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return toDto(user);
    }

    public UserDto updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }

        user.setName(request.getName());
        userRepository.save(user);
        return toDto(user);
    }

    public void changePassword(String email, ChangePasswordRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current Password is incorrect ");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public List<AddressResponse> getAddresses(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return addressRepository.findByUserId(user.getId()).stream().map(this::toAddressResponse).toList();
    }

    public AddressResponse addAddress(String email, AddressRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Address address = new Address();
        address.setUser(user);
        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setAddressLine(request.getAddressLine());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setDefault(request.isDefault());

        return toAddressResponse(addressRepository.save(address));
    }

    public AddressResponse updateAddress(String email, Long id, AddressRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setAddressLine(request.getAddressLine());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setDefault(request.isDefault());

        return toAddressResponse(addressRepository.save(address));
    }

    public void deleteAddress(String email, Long addressId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findByIdAndUserId(addressId, user.getId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        addressRepository.delete(address);
    }

    public UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole().name(),
                user.getProfileImage());
    }

    private AddressResponse toAddressResponse(Address address) {
        return new AddressResponse(address.getId(), address.getFullName(), address.getPhone(), address.getAddressLine(),
                address.getCity(), address.getState(), address.getPincode(), address.isDefault());
    }
}
