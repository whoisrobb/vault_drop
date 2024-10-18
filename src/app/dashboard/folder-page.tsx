import { useLocation } from "react-router-dom"

const FolderPage = () => {
  const { pathname } = useLocation();
  console.log(pathname.split('/').pop());
  return (
    <div>
      Folder page
    </div>
  )
}

export default FolderPage
