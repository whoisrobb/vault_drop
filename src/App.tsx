import { Route, Routes } from "react-router-dom";
import Layout from "./app/layout";
import Dashboard from "./app/dashboard";
import SharedWithMe from "./app/shared-with-me";
import Bin from "./app/bin";
import Body from "./app/dashboard/body";
import FolderPage from "./app/dashboard/folder-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Body />} />
          <Route path="folder/:folderId" element={<FolderPage />} />
        </Route>
        <Route path="shared-with-me" element={<SharedWithMe />} />
        <Route path="bin" element={<Bin />} />
      </Route>
    </Routes>
  )
}