import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { formatBytes } from "@/lib/utils";
import { FileIcon, defaultStyles } from 'react-file-icon';

type FileCardProps = {
    file: File
    onRemove: () => void
};

const FileCard = ({ file, onRemove }: FileCardProps) => {
    const filetype = file.type.split('/')[1]
    return (
        <div className="relative flex items-center gap-2.5">
            <div className="flex flex-1 gap-2.5">
                <div className="h-10 aspect-square">
                    <FileIcon extension={filetype} {...defaultStyles} />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-col gap-px">
                        <p className="line-clamp-1 text-sm font-medium text-foreground/80 max-w-80 overflow-hidden">
                            {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {formatBytes(file.size)}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-7"
                    onClick={onRemove}
                >
                    <Cross2Icon className="size-4" aria-hidden="true" />
                    <span className="sr-only">Remove file</span>
                </Button>
            </div>
        </div>
    )
}

export default FileCard;
