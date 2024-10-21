import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { handleCreateFolder, handleDeleteFolder, handleGetAllFolders } from '@/app/api/folder';

export const useFolders = () => {  
    return useQuery({
        queryKey: ['folders'],
        queryFn: handleGetAllFolders
    });
};

export const useCreateFolder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleCreateFolder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        }
    });
};

export const useDeleteFolder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleDeleteFolder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        }
    });
};
