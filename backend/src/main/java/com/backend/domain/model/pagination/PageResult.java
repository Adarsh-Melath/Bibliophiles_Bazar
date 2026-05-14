package com.backend.domain.model.pagination;

import java.util.List;
import java.util.function.Function;

public class PageResult<T> {
    private final List<T> content;
    private final int page;
    private final int size;
    private final int totalElements;
    private final int totalPages;

    public PageResult(List<T> content, int page, int size, int totalElements, int totalPages) {
        this.content = content;
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<T> getContent() {
        return content;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }

    public int getTotalElements() {
        return totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public <R> PageResult<R> map(Function<T, R> mapper) {
        List<R> mappedContent = content.stream()
                .map(mapper)
                .toList();

        return new PageResult<>(mappedContent, page, size, totalElements, totalPages);
    }

}
