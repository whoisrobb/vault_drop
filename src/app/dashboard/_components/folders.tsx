import FolderItem from "./folder-item";
import { useFolders } from "@/hooks/folder-query";

const Folders = () => {
    const { data: folders, isLoading, error } = useFolders();

    if (isLoading) return <div>Loading folders...</div>;
    if (error) return <div>Error loading folders: {error.message}</div>;

  return (
    <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-4 py-4">
      {folders?.map((item) => (
        <FolderItem key={item.folderId} folder={item} />
      ))}
    </div>
  )
}

export default Folders
