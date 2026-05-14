
package com.backend.domain.repository;

import com.backend.domain.model.User;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;

import java.util.Optional;

import com.backend.domain.model.Role;

public interface UserRepository {

    User save(User user);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    boolean existsByEmail(String email);

    PageResult<User> findAll(PageQuery query);

    PageResult<User> searchByNameOrEmail(String search, PageQuery pageable);

    PageResult<User> findByRole(Role role, PageQuery pageable);

    PageResult<User> searchByNameOrEmailAndRole(String search, Role role, PageQuery pageable);
}
