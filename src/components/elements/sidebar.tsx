import SidebarContent from "./sidebar-content";

const Sidebar = () => {
  return (
    <div className="sticky hidden lg:block py-4 left-0 h-[calc(100vh-32px)]">
        <SidebarContent />
    </div>
  )
}

export default Sidebar;