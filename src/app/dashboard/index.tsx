import { Outlet } from "react-router-dom";
import BodyHeader from "./_components/body-header";

const Dashboard = () => {
  return (
    <div className="">
      <BodyHeader />
      <Outlet />
    </div>
  )
}

export default Dashboard
