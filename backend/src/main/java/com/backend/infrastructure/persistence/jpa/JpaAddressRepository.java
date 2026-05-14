package com.backend.infrastructure.persistence.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.infrastructure.persistence.entity.AddressEntity;

import jakarta.transaction.Transactional;

public interface JpaAddressRepository extends JpaRepository<AddressEntity, Long> {
    List<AddressEntity> findByUserId(Long id);

    Optional<AddressEntity> findByIdAndUserId(Long id, Long userId);

    @Transactional
    void delete(AddressEntity address);
}
