import { handleAddFolderFiles, handleGetFolderFiles } from "@/app/api/file";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFolderFiles = (folderId: string) => {
    return useQuery({
        queryKey: ['folder'],
        queryFn: () => handleGetFolderFiles(folderId)
    });
};

export const useAddFiles = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleAddFolderFiles,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folder'] });
        }
    });
};