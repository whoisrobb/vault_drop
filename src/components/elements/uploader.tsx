import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const Uploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const abortController = useRef<AbortController | null>(null);

  // Custom upload function
    const upload = async (files: File[]) => {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file);
        });

        const response = await fetch('http://localhost:5050/files', {
            method: 'POST',
            body: formData,
            signal: abortController.current?.signal, // Handle request cancellation
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const responseData = await response.json();
        console.log('File uploaded successfully:', responseData);
    }

  // Set files and then upload them
  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    upload(newFiles); // Initiate upload after files are set
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles), // Correctly handle dropped files
    maxFiles: 10,
    maxSize: 1024 * 1024 * 4, // 4MB max file size
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input
          {...getInputProps()} // Fix: call getInputProps as a function
          id="file-upload-handle"
          type="file"
          className="hidden"
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Uploader;
