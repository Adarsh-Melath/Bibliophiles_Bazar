package com.backend.infrastructure.persistence.mapper;

import org.springframework.data.domain.Page;

import com.backend.domain.model.pagination.PageResult;

public final class PageMapper {

    private PageMapper() {

    }

    public static <T> PageResult<T> toPageResult(Page<T> page) {
        return new PageResult<>(page.getContent(), page.getNumber(), page.getSize(), (int) page.getTotalElements(),
                page.getTotalPages());
    }
}
