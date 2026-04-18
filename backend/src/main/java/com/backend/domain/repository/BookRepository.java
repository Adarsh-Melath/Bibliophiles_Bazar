package com.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.backend.domain.model.Book;

public interface BookRepository {
    Book save(Book book);

    Optional<Book> findById(Long id);

    Page<Book> findByVendorId(Long vendorId, Pageable pageable);

    Page<Book> searchByVendorId(Long vendorId, String search, Pageable pageable);

    void deleteById(Long id);

    boolean existsByIdAndVendorId(Long id, Long vendorId);

    long countByVendorId(Long vendorId);

    List<Book> findLowStockByVendorId(Long vendorId, int threshold);
}
