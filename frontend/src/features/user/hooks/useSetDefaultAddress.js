import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../lib/axios';

export const useSetDefaultAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, address }) =>
            api.put(`/user/addresses/${id}`, {
                fullName: address.fullName,
                phone: address.phone,
                addressLine: address.addressLine,
                addressLine2: address.addressLine2,
                city: address.city,
                state: address.state,
                pincode: address.pincode,
                country: address.country,
                addressType: address.addressType,
                isDefault: true
            }),
        onSuccess: (data, variables) => {
            const { id } = variables;
            console.log('Set default success, updating cache for id:', id);
            // Update the cache directly to reflect the changes
            queryClient.setQueryData(['addresses'], (oldData) => {
                if (!oldData) {
                    console.log('No old data in cache');
                    return oldData;
                }
                console.log('Old data:', oldData);
                const newData = oldData.map(addr =>
                    addr.id == id  // Use loose equality for type safety
                        ? { ...addr, isDefault: true } // Set this address as default
                        : { ...addr, isDefault: false } // Unset others as default
                );
                console.log('New data:', newData);
                return newData;
            });
            // Also invalidate to ensure fresh data
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
        },
    });
};
