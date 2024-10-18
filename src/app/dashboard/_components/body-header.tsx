import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";  
import { PlusIcon } from "@radix-ui/react-icons";
import CreateFolderForm from "./create-folder-form";
import { useState } from "react";
  
const BodyHeader = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className="py-2 flex items-center justify-between">
        <div className="">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>

        <div className="">
            <Dialog
                onOpenChange={setOpen}
                open={open}
            >
                <DialogTrigger>
                    <Button
                        variant={"default"}
                        className="flex items-center gap-2"
                    >
                        <span className="">Create new folder</span>
                        <PlusIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add folder name and drop files for upload</DialogTitle>
                        <DialogDescription>
                            <CreateFolderForm setOpen={setOpen} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default BodyHeader
