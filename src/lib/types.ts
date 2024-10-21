export type Folder = {
    files?: File[]
    name: string;
    folderId: string;
};

export type File = {
    signedUrl: string;
    fileId: string;
    filename: string;
    // url: string;
    key: string;
    type: string;
    size: number;
    folderId: string;
    createdAt: string;
};