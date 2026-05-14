package com.backend.domain.repository;

import java.util.List;
import java.util.Optional;

import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;
import com.backend.domain.model.pagination.BookSearchQuery;

import com.backend.domain.model.Book;

public interface BookRepository {
    Book save(Book book);

    Long countByVendorId(Long vendorId);

    List<Book> findLowStockByVendorId(Long vendorId, int threshold);

    Optional<Book> findById(Long id);

    Optional<Book> findByIdAndVendorId(Long id, Long vendorId);

    PageResult<Book> findByVendorId(Long vendorId, PageQuery query);

    PageResult<Book> searchByVendorId(Long vendorId, String search, PageQuery pageQuery);

    PageResult<Book> search(BookSearchQuery query);
}