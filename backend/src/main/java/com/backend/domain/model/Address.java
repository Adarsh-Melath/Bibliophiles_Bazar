package com.backend.domain.model;

public class Address {
    private Long id;
    private Long userId;
    private String fullName;
    private String phone;
    private String addressLine;
    private String city;
    private String state;
    private String pincode;
    private boolean isDefault = false;
    private String addressLine2;
    private String country;
    private String addressType;

    public Address(Long id, Long userId, String fullName, String phone, String addressLine, String city, String state,
            String pincode, boolean isDefault, String addressLine2, String country, String addressType) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.phone = phone;
        this.addressLine = addressLine;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.isDefault = isDefault;
        this.addressLine2 = addressLine2;
        this.country = country;
        this.addressType = addressType;
    }

    public void markAsDefault() {
        this.isDefault = true;
    }

    public void unmarkAsDefault() {
        this.isDefault = false;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPincode() {
        return pincode;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public String getCountry() {
        return country;
    }

    public String getAddressType() {
        return addressType;
    }
}