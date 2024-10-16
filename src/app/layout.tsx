import Sidebar from "@/components/elements/sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="grid gap-4 p-4 bg-stone-100 grid-cols-[220px_minmax(900px,_1fr)] h-[200vh]">
        <Sidebar />

        <div className="bg-background rounded-xl shadow-md overflow-hidden p-4">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout
