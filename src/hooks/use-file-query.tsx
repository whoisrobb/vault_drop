import { useCallback, useRef, useState } from "react";

type UseFileQueryOptions = {
  retry?: number; // How many times to retry on failure
  retryDelay?: number; // Delay between retries in milliseconds
  cacheKey?: string; // Key used to cache the file
  validateFile?: (file: File) => boolean; // Custom validation logic for the file
  onProgress?: (progress: number, file: File) => void; // Callback to track upload progress for each file
  fileHandler?: (files: File[]) => Promise<void>; // Function to handle the file upload process
  url?: string;
};

type FileState = {
  file: File;
  progress: number;
  status: "idle" | "loading" | "success" | "error" | "canceled";
  error: string | null;
  fileUrl: string | null; // Temporary URL for the file
};

export function useFileQuery(options: UseFileQueryOptions = {}) {
  const {
    retry = 3,
    retryDelay = 1000,
    cacheKey,
    validateFile,
    onProgress,
    fileHandler,
    url,
  } = options;

  // Manage state for multiple files
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const abortController = useRef<AbortController | null>(null);
  const retryCount = useRef<Map<File, number>>(new Map());

  const cache = useRef<Map<string, File>>(new Map());

  // Helper to update a single file's state
  const updateFileState = useCallback((file: File, updates: Partial<FileState>) => {
    setFileStates((prev) =>
      prev.map((state) =>
        state.file === file ? { ...state, ...updates } : state
      )
    );
  }, []);

  // Handle upload for an array of files
  const handleFileUpload = useCallback(
    async (files: File[]) => {
      // Set initial state for each file
      const initialFileStates: FileState[] = files.map((file) => ({
        file,
        progress: 0,
        status: "loading", // Explicitly use the allowed status values
        error: null,
        fileUrl: null,
      }));
      setFileStates((prev) => [...prev, ...initialFileStates]);

      for (const file of files) {
        if (validateFile && !validateFile(file)) {
          updateFileState(file, {
            status: "error",
            error: "Invalid file",
          });
          continue;
        }

        if (cacheKey && cache.current.has(cacheKey)) {
          const cachedFile = cache.current.get(cacheKey)!;
          const fileUrl = URL.createObjectURL(cachedFile);
          updateFileState(file, {
            progress: 100,
            status: "success",
            fileUrl,
          });
          continue;
        }

        abortController.current = new AbortController();

        try {
          // If a custom fileHandler is provided, use it for the upload
          if (fileHandler) {
            await fileHandler([file]);
          } else if (url) {
            await uploadFile(file, url); // Default upload logic if no handler is provided
          }

          const fileUrl = URL.createObjectURL(file); // Create temporary URL for preview
          updateFileState(file, {
            progress: 100,
            status: "success",
            fileUrl,
          });

          if (cacheKey) {
            cache.current.set(cacheKey, file); // Cache the file
          }
        } catch (err) {
          const retries = retryCount.current.get(file) || 0;
          if (retries < retry) {
            retryCount.current.set(file, retries + 1);
            setTimeout(() => handleFileUpload([file]), retryDelay);
          } else {
            updateFileState(file, {
              status: "error",
              error: (err as Error).message || "Upload failed",
            });
          }
        }
      }
    },
    [retry, retryDelay, cacheKey, validateFile, fileHandler, url]
  );

  const uploadFile = async (file: File, url: string) => {
    const formData = new FormData();
    formData.append("file", file); // Append the file to form data

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      signal: abortController.current?.signal, // Handle request cancellation
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const responseData = await response.json();
    console.log("File uploaded successfully:", responseData);
  };

  const cancelUpload = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
      fileStates.forEach((fileState) => {
        updateFileState(fileState.file, {
          status: "canceled",
          progress: 0,
        });
      });
    }
  }, [fileStates, updateFileState]);

  const clearCache = useCallback(() => {
    if (cacheKey) {
      cache.current.delete(cacheKey);
    }
  }, [cacheKey]);

  return {
    fileStates,
    uploadFiles: handleFileUpload,
    cancelUpload,
    clearCache,
  };
}
