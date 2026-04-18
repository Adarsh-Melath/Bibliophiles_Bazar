package com.backend.infrastructure.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.backend.domain.model.Book;
import com.backend.domain.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BookRepositoryImpl implements BookRepository {

    private final JpaBookRepository jpa;

    @Override
    public Book save(Book book) {
        return jpa.save(book);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return jpa.findById(id);
    }

    @Override
    public Page<Book> findByVendorId(Long vendorId, Pageable pageable) {
        return jpa.findByVendorId(vendorId, pageable);
    }

    @Override
    public Page<Book> searchByVendorId(Long vendorId, String search, Pageable pageable) {
        return jpa.searchByVendorId(vendorId, search, pageable);
    }

    @Override
    public void deleteById(Long id) {
        jpa.deleteById(id);
    }

    @Override
    public boolean existsByIdAndVendorId(Long id, Long vendorId) {
        return jpa.existsByIdAndVendorId(id, vendorId);
    }

    @Override
    public long countByVendorId(Long vendorId) {
        return jpa.countByVendorId(vendorId);
    }

    @Override
    public List<Book> findLowStockByVendorId(Long vendorId, int threshold) {
        return jpa.findLowStockByVendorId(vendorId, threshold);
    }
}
