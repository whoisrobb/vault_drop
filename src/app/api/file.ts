import { File } from "@/lib/types";
import { serverUrl } from "@/lib/utils";

/* GET ALL FOLDERS */
export const handleGetFolderFiles = async (folderId: string) => {
    const response = await fetch(`${serverUrl}/folders/files/${folderId}`);

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json() as File[];
    return data;
};

/* ADD FILES TO FOLDER */
export const handleAddFolderFiles = async ({ formData, folderId }: { formData: FormData, folderId: string }) => {
    const response = await fetch(`${serverUrl}/folders/files/${folderId}`, {
        method: "POST",
        body: formData
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json() as File[];
    return data;
};