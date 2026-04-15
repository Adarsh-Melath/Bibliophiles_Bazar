package com.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import com.backend.domain.model.Address;

public interface AddressRepository {
    List<Address> findByUserId(Long id);

    Optional<Address> findByIdAndUserId(Long id, Long userId);

    Address save(Address address);

    void delete(Address address);
}
