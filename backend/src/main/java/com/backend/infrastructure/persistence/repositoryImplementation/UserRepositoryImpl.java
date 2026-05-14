package com.backend.infrastructure.persistence.repositoryImplementation;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.backend.domain.model.Role;
import com.backend.domain.model.User;
import com.backend.domain.repository.UserRepository;
import com.backend.infrastructure.persistence.jpa.JpaUserRepository;
import com.backend.infrastructure.persistence.mapper.UserMapper;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;
import com.backend.infrastructure.persistence.entity.UserEntity;
import com.backend.infrastructure.persistence.mapper.PageMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {

    private final JpaUserRepository jpa;

    @Override
    public User save(User user) {
        UserEntity userEntity = UserMapper.toEntity(user);
        UserEntity savedUserEntity = jpa.save(userEntity);
        User domainUser = UserMapper.toDomain(savedUserEntity);
        return domainUser;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpa.findByEmail(email).map(UserMapper::toDomain);
    }

    @Override
    public Optional<User> findById(Long id) {
        return jpa.findById(id).map(UserMapper::toDomain);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpa.existsByEmail(email);
    }

    @Override
    public PageResult<User> findAll(PageQuery query) {
        Pageable pageable = PageRequest.of(query.getPage(), query.getSize());

        Page<User> page = jpa.findAll(pageable).map(UserMapper::toDomain);
        return PageMapper.toPageResult(page);
    }

    @Override
    public PageResult<User> searchByNameOrEmail(String search, PageQuery query) {
        Pageable pageable = PageRequest.of(query.getPage(), query.getSize(), Sort.by("createdAt").descending());
        Page<User> page = jpa.searchByNameOrEmail(search, pageable).map(UserMapper::toDomain);

        log.info("Search results: {}", page);

        return PageMapper.toPageResult(page);
    }

    @Override
    public PageResult<User> findByRole(
            Role role,
            PageQuery query) {

        Pageable pageable = PageRequest.of(
                query.getPage(),
                query.getSize());

        Page<User> page = jpa
                .findByRole(role, pageable)
                .map(UserMapper::toDomain);

        return PageMapper.toPageResult(page);
    }

    @Override
    public PageResult<User> searchByNameOrEmailAndRole(String search, Role role, PageQuery query) {
        Pageable pageable = PageRequest.of(query.getPage(), query.getSize());
        Page<User> page = jpa.searchByNameOrEmailAndRole(search, role, pageable).map(UserMapper::toDomain);

        return PageMapper.toPageResult(page);
    }
}
