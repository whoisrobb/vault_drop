import { Route, Routes } from "react-router-dom";
import Layout from "./app/layout";
import Dashboard from "./app/dashboard";
import SharedWithMe from "./app/shared-with-me";
import Bin from "./app/bin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="shared-with-me" element={<SharedWithMe />} />
        <Route path="bin" element={<Bin />} />
      </Route>
    </Routes>
  )
}