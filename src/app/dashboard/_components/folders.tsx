import FolderItem from "./folder-item";

const Folders = () => {
    const arr = [1,2,3,4,5,6,7,8,9,10,12,13,14];
  return (
    <div className="grid grid-cols-6 gap-4 py-4">
      {arr.map((item) => (
        <FolderItem key={item} />
      ))}
    </div>
  )
}

export default Folders
