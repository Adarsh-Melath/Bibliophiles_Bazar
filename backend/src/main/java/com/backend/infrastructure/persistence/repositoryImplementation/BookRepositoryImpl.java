package com.backend.infrastructure.persistence.repositoryImplementation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.backend.domain.model.Book;
import com.backend.domain.model.ProductSort;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;
import com.backend.domain.repository.BookRepository;
import com.backend.infrastructure.persistence.jpa.JpaBookRepository;
import com.backend.infrastructure.persistence.mapper.BookMapper;
import com.backend.infrastructure.persistence.mapper.PageMapper;

import com.backend.infrastructure.persistence.specification.BookSpecification;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BookRepositoryImpl implements BookRepository {

    private final JpaBookRepository jpa;

    @Override
    public Book save(Book book) {
        return BookMapper.toDomain(jpa.save(BookMapper.toEntity(book)));
    }

    @Override
    public Optional<Book> findById(Long id) {
        return jpa.findByIdAndDeletedFalse(id).map(BookMapper::toDomain);
    }

    @Override
    public PageResult<Book> findByVendorId(Long vendorId, PageQuery query) {
        Pageable p = PageRequest.of(query.getPage(), query.getSize());
        Page<Book> page = jpa.findByVendorIdAndDeletedFalse(vendorId, p).map(BookMapper::toDomain);
        return PageMapper.toPageResult(page);
    }

    @Override
    public PageResult<Book> searchByVendorId(Long vendorId, String search, PageQuery query) {
        Pageable p = PageRequest.of(query.getPage(), query.getSize());
        Page<Book> page = jpa.searchByVendorIdAndDeletedFalse(vendorId, search, p).map(BookMapper::toDomain);
        return PageMapper.toPageResult(page);
    }

    @Override
    public PageResult<Book> search(com.backend.domain.model.pagination.BookSearchQuery query) {
        Pageable pageable = PageRequest.of(query.getPage(), query.getSize(), getSort(query.getProductSort()));
        Page<Book> page = jpa.findAll(BookSpecification.search(query), pageable).map(BookMapper::toDomain);

        return PageMapper.toPageResult(page);
    }

    @Override
    public Optional<Book> findByIdAndVendorId(Long id, Long vendorId) {
        return jpa.findByIdAndVendorIdAndDeletedFalse(id, vendorId).map(BookMapper::toDomain);
    }

    @Override
    public Long countByVendorId(Long vendorId) {
        return jpa.countByVendorIdAndDeletedFalse(vendorId);
    }

    @Override
    public List<Book> findLowStockByVendorId(Long vendorId, int threshold) {
        return jpa.findLowStockByVendorIdAndDeletedFalse(vendorId, threshold).stream().map(BookMapper::toDomain)
                .toList();
    }

    private Sort getSort(ProductSort sort) {
        return switch(sort){
                    case PRICE_ASC ->
            Sort.by("price").ascending();

        case PRICE_DESC ->
            Sort.by("price").descending();

        case TITLE_ASC ->
            Sort.by("title").ascending();

        case TITLE_DESC ->
            Sort.by("title").descending();

        default ->
            Sort.by("createdAt").descending();

        };
    }
}
