package com.backend.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.Address;
import com.backend.domain.repository.AddressRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AddressRepositoryImpl implements AddressRepository {

    private final JpaAddressRepository jpa;

    @Override
    public List<Address> findByUserId(Long id) {
        return jpa.findByUserId(id);
    }

    @Override
    public Optional<Address> findByIdAndUserId(Long id, Long userId) {
        return jpa.findByIdAndUserId(id, userId);
    }

    @Override
    public Address save(Address address) {
        return jpa.save(address);
    }

    @Override
    public void delete(Address address) {
        jpa.delete(address);
    }

}
