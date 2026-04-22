import z from 'zod';

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Must contain at least one number'),
        confirmPassword: z.string(),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const addressFormSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    phone: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(10, 'Phone number must be 10 digits'),
    addressLine: z
        .string()
        .min(5, 'Address line must be at least 5 characters'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    pincode: z
        .string()
        .min(6, 'Pincode must be 6 digits')
        .max(6, 'Pincode must be 6 digits'),
    country: z
        .string()
        .min(2, 'Country must be at least 2 characters')
        .default('India'),
    addressType: z.string().default('HOME'),
    isDefault: z.boolean().default(false),
});

//image validation

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 4096, height: 4096 };
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

const formatBytes = (bytes, decimal = 2) => {
    if (bytes === 0) return '0 bytes';

    const k = 1024;
    const decimalVal = decimal < 0 ? 0 : decimal;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(decimalVal)) +
        ' ' +
        sizes[i]
    );
};
export const editProfileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, 'Phone must be 10 digits')
        .or(z.literal('')),
    // Image is handled separately outside the schema (file input + preview state)
});
