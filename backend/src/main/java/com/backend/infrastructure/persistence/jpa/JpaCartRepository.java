package com.backend.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.infrastructure.persistence.entity.CartEntity;

public interface JpaCartRepository extends JpaRepository<CartEntity, Long> {

}
