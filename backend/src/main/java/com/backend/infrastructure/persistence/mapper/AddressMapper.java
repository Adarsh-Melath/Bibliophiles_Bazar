package com.backend.infrastructure.persistence.mapper;

import com.backend.domain.model.Address;
import com.backend.infrastructure.persistence.entity.AddressEntity;
import com.backend.infrastructure.persistence.entity.UserEntity;

public final class AddressMapper {
    private AddressMapper() {
    }

    public static Address toDomain(AddressEntity e) {
        return new Address(e.getId(), e.getUser().getId(), e.getFullName(), e.getPhone(), e.getAddressLine(),
                e.getCity(),
                e.getState(), e.getPincode(), e.isDefault(), e.getAddressLine2(), e.getCountry(), e.getAddressType());
    }

    public static AddressEntity toEntity(Address a) {

        AddressEntity e = new AddressEntity();

        e.setId(a.getId());

        UserEntity user = new UserEntity();
        user.setId(a.getUserId());

        e.setUser(user);

        e.setFullName(a.getFullName());
        e.setPhone(a.getPhone());
        e.setAddressLine(a.getAddressLine());
        e.setCity(a.getCity());
        e.setState(a.getState());
        e.setPincode(a.getPincode());
        e.setDefault(a.isDefault());
        e.setAddressLine2(a.getAddressLine2());
        e.setCountry(a.getCountry());
        e.setAddressType(a.getAddressType());

        return e;
    }

}
