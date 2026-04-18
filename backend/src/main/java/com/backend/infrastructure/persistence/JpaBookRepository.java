package com.backend.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.domain.model.Book;

public interface JpaBookRepository extends JpaRepository<Book, Long> {
    Book save(Book book);

    Optional<Book> findById(Long id);

    Page<Book> findByVendorId(Long vendorId, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.vendor.id = :vendorId AND " +
            "(LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Book> searchByVendorId(@Param("vendorId") Long vendorId,
            @Param("search") String search,
            Pageable pageable);

    void deleteById(Long id);

    boolean existsByIdAndVendorId(Long id, Long vendorId);

    long countByVendorId(Long vendorId);

    @Query("SELECT b FROM Book b WHERE b.vendor.id = :vendorId AND b.stock <= :threshold")
    List<Book> findLowStockByVendorId(@Param("vendorId") Long vendorId,
            @Param("threshold") int threshold);
}
