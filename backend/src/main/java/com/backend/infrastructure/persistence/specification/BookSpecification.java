package com.backend.infrastructure.persistence.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.backend.domain.model.pagination.BookSearchQuery;
import com.backend.infrastructure.persistence.entity.BookEntity;

import jakarta.persistence.criteria.Predicate;

public class BookSpecification {
    public static Specification<BookEntity> search(BookSearchQuery query) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // hide deleted;

            predicates.add(criteriaBuilder.notEqual(root.get("deleted"), true));

            // keyword search
            if (query.getKeyword() != null && !query.getKeyword().isBlank()) {
                predicates.add(
                        criteriaBuilder.or(
                                criteriaBuilder.like(
                                        criteriaBuilder.lower(root.get("title")),
                                        "%" + query.getKeyword().toLowerCase() + "%"),

                                criteriaBuilder.like(
                                        criteriaBuilder.lower(root.get("author")),
                                        "%" + query.getKeyword().toLowerCase() +
                                                "%")));
            }

            // category filter
            if (query.getCategoryId() != null) {
                predicates.add(
                        criteriaBuilder.equal(
                                root.get("category").get("id"),
                                query.getCategoryId()));
            }

            // min price
            if (query.getMinPrice() != null) {
                predicates.add(
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("price"),
                                query.getMinPrice()));
            }

            // maxPrice
            if (query.getMaxPrice() != null) {
                predicates.add(
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("price"),
                                query.getMaxPrice()));

            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
