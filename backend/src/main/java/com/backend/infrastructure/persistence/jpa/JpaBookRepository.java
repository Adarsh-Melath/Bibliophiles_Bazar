package com.backend.infrastructure.persistence.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.infrastructure.persistence.entity.BookEntity;

public interface JpaBookRepository extends JpaRepository<BookEntity, Long>, JpaSpecificationExecutor<BookEntity> {
        BookEntity save(BookEntity book);

        Optional<BookEntity> findByIdAndDeletedFalse(Long id);

        Page<BookEntity> findByVendorIdAndDeletedFalse(Long vendorId, Pageable pageable);

        Page<BookEntity> findAll(Specification<BookEntity> spec, Pageable pageable);

        @Query("SELECT b FROM BookEntity b WHERE b.vendor.id = :vendorId AND " +
                        "(LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
                        "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%')))")
        Page<BookEntity> searchByVendorIdAndDeletedFalse(@Param("vendorId") Long vendorId,
                        @Param("search") String search,
                        Pageable pageable);

        Optional<BookEntity> findByIdAndVendorIdAndDeletedFalse(Long id, Long vendorId);

        long countByVendorIdAndDeletedFalse(Long vendorId);

        @Query("SELECT b FROM BookEntity b WHERE b.vendor.id = :vendorId AND b.stock <= :threshold")
        List<BookEntity> findLowStockByVendorIdAndDeletedFalse(@Param("vendorId") Long vendorId,
                        @Param("threshold") int threshold);
}
