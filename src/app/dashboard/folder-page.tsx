import { useParams } from "react-router-dom"
import FilesTable from "./_components/files-table";
import { useGetFolderFiles } from "@/hooks/use-file-query";

const FolderPage = () => {
  const { folderId } = useParams();

  const { data: files } = useGetFolderFiles(folderId!);
  console.log(files);
  return (
    <div>
      {files && <FilesTable files={files} />}
    </div>
  )
}

export default FolderPage
