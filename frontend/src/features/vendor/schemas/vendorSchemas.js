import z from 'zod';

export const bookFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    isbn: z.string().min(10, 'ISBN must be at least 10 characters'),
    category: z.string().min(1, 'Category is required'),
    description: z
        .string()
        .min(20, 'Description must be at least 20 characters'),
    price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
    stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
    coverImageUrl: z
        .string()
        .url('Enter a valid URL')
        .optional()
        .or(z.literal('')),
    language: z.string().optional(),
    pages: z.coerce.number().int().min(1).optional().or(z.literal('')),
    publishedDate: z.string().optional(),
});

export const vendorSignUpSchema = z.object({
    // Step 1 — Contact info
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(7, 'Enter a valid phone number'),

    // Step 2 — Publisher info
    businessName: z.string().min(2, 'Business name is required'),
    businessRegistrationNumber: z
        .string()
        .min(3, 'Registration number is required'),
    website: z
        .string()
        .url('Enter a valid URL (e.g. https://yourpublisher.com)'),
    publishingSince: z
        .string()
        .regex(/^\d{4}$/, 'Enter a valid year (e.g. 1995)')
        .refine(
            (y) => parseInt(y) <= new Date().getFullYear(),
            'Year cannot be in the future',
        )
        .refine((y) => parseInt(y) >= 1800, 'Year seems too far back'),
    businessDescription: z
        .string()
        .min(20, 'Please describe your publishing house (min 20 chars)'),
    category: z.string().min(1, 'Select a primary category'),
});
