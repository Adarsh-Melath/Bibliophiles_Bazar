package com.backend.application.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.backend.application.dto.BookRequest;
import com.backend.application.dto.BookResponse;
import com.backend.domain.model.Book;
import com.backend.domain.model.User;
import com.backend.domain.repository.BookRepository;
import com.backend.domain.repository.UserRepository;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    // Get vendor from security context
    private User getCurrentVendor(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
    }

    public BookResponse addBook(String email, BookRequest request) {
        User vendor = getCurrentVendor(email);
        Book book = new Book();

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setCategory(request.getCategory());
        book.setDescription(request.getDescription());
        book.setPrice(request.getPrice());
        book.setStock(request.getStock());
        book.setCoverImageUrl(request.getCoverImageUrl());
        book.setLanguage(request.getLanguage());
        book.setPages(request.getPages());
        book.setPublishedDate(request.getPublishedDate());

        book.setVendor(vendor);
        return toBookResponse(bookRepository.save(book));
    }

    public BookResponse updateBook(String email, Long id, BookRequest request) {
        User vendor = getCurrentVendor(email);
        if (!bookRepository.existsByIdAndVendorId(id, vendor.getId())) {
            throw new RuntimeException("Book not found or access denied");
        }

        Book book = bookRepository.findById(id).orElseThrow();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setCategory(request.getCategory());
        book.setDescription(request.getDescription());
        book.setPrice(request.getPrice());
        book.setStock(request.getStock());
        book.setCoverImageUrl(request.getCoverImageUrl());
        book.setLanguage(request.getLanguage());
        book.setPages(request.getPages());
        book.setUpdatedAt(LocalDateTime.now());

        return toBookResponse(bookRepository.save(book));
    }

    public void deleteBook(String email, Long id) {
        User vendor = getCurrentVendor(email);
        if (!bookRepository.existsByIdAndVendorId(id, vendor.getId())) {
            throw new RuntimeException("Book not found or access denied");
        }
        bookRepository.deleteById(id);
    }

    // Get single book
    public BookResponse getBook(String vendorEmail, Long bookId) {
        User vendor = getCurrentVendor(vendorEmail);
        if (!bookRepository.existsByIdAndVendorId(bookId, vendor.getId()))
            throw new RuntimeException("Book not found or access denied");
        return toBookResponse(bookRepository.findById(bookId).orElseThrow());
    }

    public Page<BookResponse> getMyBooks(String vendorEmail, String search, int page, int size) {
        User vendor = getCurrentVendor(vendorEmail);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Book> books = search != null && !search.isBlank()
                ? bookRepository.searchByVendorId(vendor.getId(), search, pageable)
                : bookRepository.findByVendorId(vendor.getId(), pageable);
        return books.map(this::toBookResponse);
    }

    private BookResponse toBookResponse(Book book) {
        return new BookResponse(
                book.getId(), book.getTitle(), book.getAuthor(), book.getIsbn(),
                book.getCategory(), book.getDescription(), book.getPrice(), book.getStock(),
                book.getCoverImageUrl(), book.getLanguage(), book.getPages(), book.getPublishedDate(),
                book.getStatus().name(), book.getCreatedAt());
    }
}