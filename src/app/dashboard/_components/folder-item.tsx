import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
  
const FolderItem = () => {
  return (
    <div className="space-y-1">
        <Link to={"/dashboard/folder/1"}>
            <div className="w-full aspect-square border rounded"></div>
        </Link>
        <div className="flex justify-between items-baseline">
            <div className="leading-tight">
                <p className="font-semibold">Project 01</p>
                <p className="text-sm text-muted-foreground">10 files</p>
            </div>

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
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

       </div>
    </div>
  )
}

export default FolderItem
