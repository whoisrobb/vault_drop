import { Separator } from "@/components/ui/separator";
import Header from "./header";
import { Outlet } from "react-router-dom";
import BodyHeader from "./_components/body-header";

const Dashboard = () => {
  return (
    <div className="">
      <Header />
      <Separator />
      <BodyHeader />
      <Outlet />
    </div>
  )
}

export default Dashboard
