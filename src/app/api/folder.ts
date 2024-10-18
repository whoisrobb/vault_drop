import { serverUrl } from "@/lib/utils";

export const handleCreateFolder = async (data: FormData, parentFolderId?: string) => {
    const response = await fetch(`${serverUrl}/folders${parentFolderId ? "/" + parentFolderId + "/subfolders": ""}`, {
        method: "POST",
        body: data
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return await response.json();
};