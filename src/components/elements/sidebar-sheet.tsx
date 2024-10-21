import {
    Sheet,
    SheetContent,
    // SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import SidebarContent from "./sidebar-content";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
  
const SidebarSheet = () => {
    const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
                <HamburgerMenuIcon />
            </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
            <SheetHeader>
                <SheetTitle>Logo here</SheetTitle>
            </SheetHeader>

            <SidebarContent setSheetOpen={setOpen} />
        </SheetContent>
    </Sheet>
  )
}

export default SidebarSheet
