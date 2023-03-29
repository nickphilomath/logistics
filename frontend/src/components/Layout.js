import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MessageBar from "./MessageBar/MessageBar";

const Layout = () => {
  return (
    <div className="pages">
      <Navbar />
      <MessageBar />
      <Outlet />
    </div>
  );
};

export default Layout;
