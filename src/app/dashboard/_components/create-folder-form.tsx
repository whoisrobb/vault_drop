import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUpload } from "@/components/elements/uploader";
import FileCard from "./file-card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateFolder } from "@/hooks/folder-query";


const folderFormSchema = z.object({
    name: z.string().min(3).max(50)
});

type FolderSchema = z.infer<typeof folderFormSchema>;
// const queryClient = useQueryClient();

const CreateFolderForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [files, setFiles] = useState<File[]>([]);
    const { mutateAsync: createFolderMutation } = useCreateFolder();
    const navigate = useNavigate();

    const form = useForm<FolderSchema>({
        resolver: zodResolver(folderFormSchema),
        defaultValues: {
            name: "",
        },
    });
    
    const onRemove = (index: number) => {
        if (!files) return
        const newFiles = files.filter((_, i) => i !== index)
        setFiles(newFiles);
    };

    const onSubmit = async (values: FolderSchema) => {
        const formData = new FormData();
        formData.append("name", values.name);
        files.forEach((file) => formData.append("files", file));
        
        let folderCreationPromise = () => createFolderMutation(formData);

        toast.promise(folderCreationPromise(), {
            loading: 'Creating folder...',
            success: (data) => {
                setOpen(false);
                navigate(`/dashboard/folder/${data.folderId}`);
                return `Successfully created "${data.name}" folder`;
            },
            error: (error) => {
                return error.message || 'Failed to create folder';
            },
        });
    };

    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Folder name</FormLabel>
                    <FormControl>
                        <Input placeholder="Folder name" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FileUpload
            files={files}
            setFiles={setFiles}
        />
        
        {files?.length ? (
            <ScrollArea className="h-36 w-full px-3">
            <div className="flex max-h-48 flex-col gap-4">
                {files?.map((file, index) => (
                    <FileCard
                        key={index}
                        file={file}
                        onRemove={() => onRemove(index)}
                    />
                ))}
            </div>
            </ScrollArea>
        ) : null}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CreateFolderForm;
