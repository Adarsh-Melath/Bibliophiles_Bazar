package com.backend.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.model.Address;

import jakarta.transaction.Transactional;

public interface JpaAddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserId(Long id);

    Optional<Address> findByIdAndUserId(Long id, Long userId);

    @Transactional
    void delete(Address address);
}
