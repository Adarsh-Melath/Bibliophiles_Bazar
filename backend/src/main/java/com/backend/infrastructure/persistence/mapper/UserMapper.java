package com.backend.infrastructure.persistence.mapper;

import com.backend.domain.model.User;
import com.backend.infrastructure.persistence.entity.UserEntity;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class UserMapper {
    public static User toDomain(UserEntity e) {
        return new User(
                e.isBlocked(),
                e.getEmail(),
                e.isEnabled(),
                e.getId(),
                e.getName(),
                e.getPassword(),
                e.getPhone(),
                e.getProfileImage(),
                e.getRole());
    }

    public static UserEntity toEntity(User u) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(u.getId());
        userEntity.setName(u.getName());
        userEntity.setEmail(u.getEmail());
        userEntity.setPhone(u.getPhone());
        userEntity.setEnabled(u.isEnabled());
        userEntity.setBlocked(u.isBlocked());
        userEntity.setPassword(u.getPassword());
        userEntity.setRole(u.getRole());
        userEntity.setProvider(u.getProvider());
        userEntity.setProfileImage(u.getProfileImage());
        return userEntity;
    }
}
