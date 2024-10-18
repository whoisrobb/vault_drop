import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DashboardIcon, Share1Icon, TrashIcon } from "@radix-ui/react-icons"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const serverUrl = "http://localhost:5050"

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: "accurate" | "normal"
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
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

