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
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    addressLine: z.string().min(3, 'Address line is required'),
    addressLine2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().regex(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
    country: z.string().min(1, 'Country is required'),
});

export const manageProfileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, 'Phone must be 10 digits')
        .or(z.literal('')),
});
