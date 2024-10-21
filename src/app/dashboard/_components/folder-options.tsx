import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";  
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon, EnterIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import type { Folder } from "@/lib/types";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useDeleteFolder } from "@/hooks/folder-query";

const FolderOptions = ({ folder }: { folder: Folder }) => {
    const [delModalOpen, setDelModalOpen] = useState(false);

  return (
    <>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button
                variant={"ghost"}
                size={"icon"}
                className="size-6 rounded-sm"
            >
                <DotsVerticalIcon />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <Link to={`/dashboard/folder/${folder.folderId}`}>
                <DropdownMenuItem className="cursor-pointer space-x-2">
                    <Pencil2Icon />
                    <span className="">Open</span>
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer space-x-2">
                <EnterIcon />
                <span className="">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
                className="cursor-pointer space-x-2 text-red-600 hover:text-red-600 focus:text-red-600 hover:bg-red-50 focus:bg-red-50"
                onClick={() => setDelModalOpen(true)}
            >
                <TrashIcon />
                <span className="">Delete</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    <DeleteModal
        folderId={folder.folderId}
        delModalOpen={delModalOpen}
        setDelModalOpen={setDelModalOpen}
    />
    </>
  )
}

export default FolderOptions

type DeleteModalProps = {
    folderId: string;
    delModalOpen: boolean;
    setDelModalOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteModal = ({ folderId, delModalOpen, setDelModalOpen }: DeleteModalProps) => {
    const { mutateAsync: deleteFolderMutation } = useDeleteFolder();
    
    const onSubmit = async (folderId: string) => {
        
        let folderCreationPromise = () => deleteFolderMutation(folderId);

        toast.promise(folderCreationPromise(), {
            loading: 'Deleting folder...',
            success: (data) => {
                setDelModalOpen(false);
                return `Successfully deleted "${data.name}" folder`;
            },
            error: (error) => {
                return error.message || 'Failed to create folder';
            },
        });
    };

  return (
    <Dialog
        open={delModalOpen}
        onOpenChange={setDelModalOpen}
    >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete this folder
                    and remove folder and associated files data from our servers.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <Button
                    onClick={() => onSubmit(folderId)}
                >
                    Delete
                </Button>

                <Button
                    variant={"secondary"}
                    onClick={() => setDelModalOpen(false)}
                >
                    Cancel
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
