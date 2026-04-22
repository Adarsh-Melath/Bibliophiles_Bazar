package com.backend.application.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final StorageService storageService;

    public UserDto getProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        return toDto(user);
    }

    public UserDto updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getProfileImage() == null && user.getProfileImage() != null) {
            String oldKey = extractKeyFromUrl(user.getProfileImage());
            storageService.deleteFile(oldKey);
        }

        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        user.setName(request.getName());
        user.setProfileImage(request.getProfileImage());
        userRepository.save(user);
        return toDto(user);
    }

    public String uploadProfileImage(String email, MultipartFile file)

    {
        User user = userRepository.findByEmail(email).orElseThrow();
        if (user.getProfileImage() != null) {
            String key = extractKeyFromUrl(user.getProfileImage());
            storageService.deleteFile(key);
        }

        String key = "profiles/" + user.getId() + "-" + System.currentTimeMillis();
        String url = storageService.uploadFile(file, key);
        user.setProfileImage(url);
        userRepository.save(user);
        return url;
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

        log.debug("isDefault" + request.isDefault());

        // If adding this address as default, unset all other default addresses for this
        // user
        if (request.isDefault()) {
            log.debug("isDefault in if condition of addAddress Method");
            List<Address> userAddresses = addressRepository.findByUserId(user.getId());
            for (Address addr : userAddresses) {
                addr.setDefault(false);
                addressRepository.save(addr);
            }
        }

        Address address = new Address();
        address.setUser(user);
        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setAddressLine(request.getAddressLine());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setDefault(request.isDefault());
        address.setAddressLine2(request.getAddressLine2());
        address.setCountry(request.getCountry());
        address.setAddressType(request.getAddressType());

        Address saved = addressRepository.save(address);
        log.debug("isDefault value after saved in addmethod method" + saved.isDefault());
        return toAddressResponse(saved);
    }

    public AddressResponse updateAddress(String email, Long id, AddressRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // If setting this address as default, unset all other default addresses for
        // this user
        if (request.isDefault()) {
            log.debug("isDefault in if condition of update Address Method");
            List<Address> userAddresses = addressRepository.findByUserId(user.getId());
            for (Address addr : userAddresses) {
                if (!addr.getId().equals(id)) {
                    addr.setDefault(false);
                    addressRepository.save(addr);
                }
            }
        }

        address.setFullName(request.getFullName());
        address.setPhone(request.getPhone());
        address.setAddressLine(request.getAddressLine());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setDefault(request.isDefault());
        address.setAddressLine2(request.getAddressLine2());
        address.setCountry(request.getCountry());
        address.setAddressType(request.getAddressType());

        Address saved = addressRepository.save(address);
        log.debug("isDefault value after saved in updateAddress method" + saved.isDefault());

        return toAddressResponse(saved);
    }

    public void deleteAddress(String email, Long addressId) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findByIdAndUserId(addressId, user.getId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        addressRepository.delete(address);
    }

    private UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole().name(),
                user.getProfileImage(), user.getPhone());
    }

    private AddressResponse toAddressResponse(Address address) {
        return new AddressResponse(address.getId(), address.getFullName(), address.getPhone(), address.getAddressLine(),
                address.getCity(), address.getState(), address.getPincode(), address.isDefault(),
                address.getAddressLine2(), address.getCountry(), address.getAddressType());
    }

    private String extractKeyFromUrl(String url) {
        // URL format: https://bucket.s3.region.amazonaws.com/profiles/123-timestamp
        // Key is everything after the domain
        return url.substring(url.indexOf(".amazonaws.com/") + ".amazonaws.com/".length());
    }
}
