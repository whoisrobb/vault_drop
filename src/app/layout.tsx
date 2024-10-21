import Header from "@/components/elements/header"
import Sidebar from "@/components/elements/sidebar"
import { Separator } from "@/components/ui/separator"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="grid gap-4 bg-stone-100 lg:grid-cols-[220px_1fr] min-h-screen">
        <Sidebar />

        <div className="bg-background shadow-md overflow-hidden p-4">
            <Header />
            <Separator />
            <Outlet />
        </div>
    </div>
  )
}

export default Layout
