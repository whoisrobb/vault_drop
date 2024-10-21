import { Link } from "react-router-dom";
import { FolderIcon } from "@heroicons/react/24/outline";
import type { Folder } from "@/lib/types";
import FolderOptions from "./folder-options";
  
const FolderItem = ({ folder }: { folder: Folder }) => {
  return (
    <div className="space-y-1">
        <Link to={`/dashboard/folder/${folder.folderId}`}>
            {/* <div className="w-full aspect-square border rounded"></div> */}
            <FolderIcon className="text-muted-foreground shadow hover:shadow-lg transition-all" />
        </Link>
        <div className="flex justify-between items-baseline">
            <div className="leading-tight">
                <p className="font-semibold max-w-32 overflow-hidden">{folder.name}</p>
                <p className="text-sm text-muted-foreground">10 files</p>
            </div>
            <FolderOptions folder={folder} />
       </div>
    </div>
  )
}

export default FolderItem
