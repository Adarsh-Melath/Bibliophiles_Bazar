package com.backend.infrastructure.persistence.repositoryImplementation;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.backend.domain.model.Address;
import com.backend.domain.repository.AddressRepository;
import com.backend.infrastructure.persistence.entity.AddressEntity;
import com.backend.infrastructure.persistence.jpa.JpaAddressRepository;
import com.backend.infrastructure.persistence.mapper.AddressMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AddressRepositoryImpl implements AddressRepository {

    private final JpaAddressRepository jpa;

    @Override
    public List<Address> findByUserId(Long id) {
        return jpa.findByUserId(id).stream().map(AddressMapper::toDomain).toList();
    }

    @Override
    public Optional<Address> findByIdAndUserId(Long id, Long userId) {
        return jpa.findByIdAndUserId(id, userId).map(AddressMapper::toDomain);
    }

    @Override
    public Address save(Address address) {
        AddressEntity addressEntity = AddressMapper.toEntity(address);

        AddressEntity savedEntity = jpa.save(addressEntity);

        return AddressMapper.toDomain(savedEntity);
    }

    @Override
    public void delete(Address address) {
        jpa.delete(AddressMapper.toEntity(address));
    }

}
