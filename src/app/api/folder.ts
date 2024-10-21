import { Folder } from "@/lib/types";
import { serverUrl } from "@/lib/utils";

/* GET ALL FOLDERS */
export const handleGetAllFolders = async () => {
    const response = await fetch(`${serverUrl}/folders`);

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json() as Folder[];
    return data;
};

/* CREATE A NEW FOLDER */
export const handleCreateFolder = async (formData: FormData, parentFolderId?: string) => {
    const response = await fetch(`${serverUrl}/folders${parentFolderId ? "/" + parentFolderId + "/subfolders": ""}`, {
        method: "POST",
        body: formData
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json() as Folder;
    return data;
};

/* CREATE A NEW FOLDER */
export const handleDeleteFolder = async (folderId: string) => {
    const response = await fetch(`${serverUrl}/folders/${folderId}`, {
        method: "DELETE"
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json() as Folder;
    return data;
};