package com.backend.domain.model.pagination;

import java.math.BigDecimal;

import com.backend.domain.model.ProductSort;

public class BookSearchQuery {

    private String keyword;

    private Long categoryId;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

    private ProductSort sort;

    private int page;

    private int size;

    public BookSearchQuery(String keyword, Long categoryId, BigDecimal minPrice, BigDecimal maxPrice, ProductSort sort,
            int page, int size) {
        this.keyword = keyword;
        this.categoryId=categoryId;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.sort = sort;
        this.page = page;
        this.size = size;
    }

    public String getKeyword() {
        return keyword;
    }
    
    public Long getCategoryId() {
        return categoryId;
    }

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }
    
    public ProductSort getProductSort() {
        return sort;
    }

    public int getPage() {
        return page;
    }

    public int getSize() {
        return size;
    }


}
