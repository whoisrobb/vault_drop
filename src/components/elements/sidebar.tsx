import { cn, sidebarRoutes } from "@/lib/utils";
import AccountToggle from "./account-toggle";
import { Link, useLocation } from "react-router-dom";

type SidebarRoute = typeof sidebarRoutes[0];

const SidebarItem = ({ text, href, Icon }: SidebarRoute) => {
    const { pathname } = useLocation();

    return (
        <li className="">
            <Link
                to={href}
                className={cn("flex items-center gap-2 capitalize py-1 px-2 hover:bg-background hover:shadow-sm transition-all rounded",
                    pathname.includes(href) && "text-semibold bg-stone-200 shadow"
                )}    
            >
                <Icon />
                <span className="">{text}</span>
            </Link>
        </li>
    );
};

const Sidebar = () => {
  return (
    <div className="sticky top-4 py-4 left-0 h-[calc(100vh-32px)]">
        <AccountToggle />
      
        <ul className="space-y-1">
            {sidebarRoutes.map((route, index) => (
                <SidebarItem key={index} {...route} />
            ))}

        </ul>
    </div>
  )
}

export default Sidebar;