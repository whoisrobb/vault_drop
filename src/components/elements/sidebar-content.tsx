import { Link, useLocation } from "react-router-dom";
import AccountToggle from "./account-toggle";
import { cn, sidebarRoutes } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type SidebarRoute = typeof sidebarRoutes[0] & {
    setSheetOpen?: Dispatch<SetStateAction<boolean>>
};

const SidebarItem = ({ text, href, Icon, setSheetOpen }: SidebarRoute) => {
    const { pathname } = useLocation();

    return (
        <li className="">
            <Link
                to={href}
                className={cn("flex items-center gap-2 capitalize py-1 px-2 hover:bg-background hover:shadow-sm transition-all rounded",
                    pathname.includes(href) && "text-semibold bg-stone-200 shadow"
                )}
                onClick={setSheetOpen ? () => setSheetOpen(false) : () => {}}
            >
                <Icon />
                <span className="">{text}</span>
            </Link>
        </li>
    );
};

const SidebarContent = ({
    setSheetOpen
}: {
    setSheetOpen?: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div>
        <AccountToggle />
    
        <ul className="space-y-1">
            {sidebarRoutes.map((route, index) => (
                <SidebarItem key={index} {...route} setSheetOpen={setSheetOpen} />
            ))}

        </ul>
    </div>
  )
}

export default SidebarContent
