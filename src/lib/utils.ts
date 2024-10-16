import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DashboardIcon, Share1Icon, TrashIcon } from "@radix-ui/react-icons"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sidebarRoutes = [
  {
    text: "dashboard",
    href: "/dashboard",
    Icon: DashboardIcon
  },
  {
    text: "shared with me",
    href: "/shared-with-me",
    Icon: Share1Icon
  },
  {
    text: "bin",
    href: "/bin",
    Icon: TrashIcon
  },
]

