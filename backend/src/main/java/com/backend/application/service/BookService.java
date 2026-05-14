package com.backend.application.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.application.dto.BookImageRequest;
import com.backend.application.dto.BookImageResponse;
import com.backend.application.dto.BookRequest;
import com.backend.application.dto.BookResponse;
import com.backend.application.exception.bookexception.BookNotFoundException;
import com.backend.application.exception.categoryException.CategoryNotFoundException;
import com.backend.application.exception.categoryException.InactiveCategoryException;
import com.backend.application.exception.vendorexception.VendorNotFoundException;
import com.backend.domain.model.Book;
import com.backend.domain.model.BookImage;
import com.backend.domain.model.Category;
import com.backend.domain.model.ISBN;
import com.backend.domain.model.ProductSort;
import com.backend.domain.model.User;
import com.backend.domain.model.pagination.BookSearchQuery;
import com.backend.domain.model.pagination.PageQuery;
import com.backend.domain.model.pagination.PageResult;
import com.backend.domain.repository.BookRepository;
import com.backend.domain.repository.CategoryRepository;
import com.backend.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;


    public BookResponse addBook(String email, BookRequest request) {
        User vendor = getCurrentVendor(email);
        Category category = getActiveCategoryOrThrow(request.getCategoryId());
        Book book = Book.create(
                vendor.getId(),
                request.getCategoryId(),
                request.getTitle(),
                request.getAuthor(),
                ISBN.from(request.getIsbn()),
                request.getDescription(),
                request.getPrice(),
                request.getStock(),
                toBookImages(request.getImages()),
                request.getLanguage(),
                request.getPages(),
                request.getPublishedDate());

        return toBookResponse(bookRepository.save(book));
    }

    public BookResponse updateBook(String email, Long id, BookRequest request) {
        User vendor = getCurrentVendor(email);
        Category category = getActiveCategoryOrThrow(request.getCategoryId());

        Book book = getVendorBookOrThrow(id, vendor.getId());
        book.update(request.getTitle(), request.getAuthor(), ISBN.from(request.getIsbn()), request.getDescription(),
                request.getPrice(), request.getStock(), toBookImages(request.getImages()), request.getLanguage(),
                request.getPages());
        return toBookResponse(bookRepository.save(book));
    }

    public void deleteBook(String email, Long id) {
        User vendor = getCurrentVendor(email);
        Book book = getVendorBookOrThrow(id, vendor.getId());
        book.softDelete();
        bookRepository.save(book);
    }

    // Get single book
    public BookResponse getBook(String vendorEmail, Long id) {
        User vendor = getCurrentVendor(vendorEmail);
        return toBookResponse(getVendorBookOrThrow(id, vendor.getId()));
    }

    public PageResult<BookResponse> getMyBooks(String vendorEmail, String search, int page, int size) {
        User vendor = getCurrentVendor(vendorEmail);
        PageQuery query = new PageQuery(page, size);
        PageResult<Book> books = search != null && !search.isBlank()
                ? bookRepository.searchByVendorId(vendor.getId(), search, query)
                : bookRepository.findByVendorId(vendor.getId(), query);
        return books.map(this::toBookResponse);
    }

    public PageResult<BookResponse> searchBooks(BookSearchQuery query) {
        return bookRepository.search(query).map(this::toBookResponse);
    }

    private BookResponse toBookResponse(Book book) {
        return new BookResponse(
                book.getId(), book.getVendorId(), book.getCategoryId(), book.getTitle(), book.getAuthor(),
                book.getIsbn().getValue(), book.getDescription(), book.getPrice(), book.getStock(),
                toBookImageResponse(book.getImages()), book.getLanguage(), book.getPages(), book.getPublishedDate(),
                book.getStatus().name(), book.getCreatedAt());
    }

    private List<BookImage> toBookImages(List<BookImageRequest> request) {
        return request.stream()
                .map(req -> new BookImage(null, req.getImageUrl(), req.isPrimary(), req.getSortOrder()))
                .toList();
    }

    private List<BookImageResponse> toBookImageResponse(List<BookImage> request) {
        return request.stream()
                .map(req -> new BookImageResponse(req.getId(), req.getImageUrl(), req.isPrimary(), req.getSortOrder()))
                .toList();
    }

    // Get vendor from security context
    private User getCurrentVendor(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new VendorNotFoundException("Vendor not found"));
    }

    private Book getVendorBookOrThrow(Long id, Long vendorId) {
        return bookRepository.findByIdAndVendorId(id, vendorId)
                .orElseThrow(() -> new BookNotFoundException("Book Not found exception or access denied"));
    }

    private Category getActiveCategoryOrThrow(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category is not found"));

        if (!category.isActive()) {
            throw new InactiveCategoryException("Category is inactive");
        }

        return category;
    }

  
}