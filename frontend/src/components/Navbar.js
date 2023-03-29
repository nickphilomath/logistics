import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiExchangeDollarLine, RiLineChartLine, RiAdminLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import "./Navbar.css";

const Navbar = () => {
  const [isMinimazed, setIsMinimazed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-logo"></div>
      <div className="sidebar-main">
        <div
          className="sidebar-item"
          onClick={() => {
            navigate("/assets");
          }}
        >
          <FaMapMarkedAlt />
          <div className="sidebar-title">Assets</div>
        </div>
        <div
          className="sidebar-item"
          onClick={() => {
            navigate("/users");
          }}
        >
          <HiUsers />
          <div className="sidebar-title">Users</div>
        </div>
        <div className="sidebar-item">
          <RiExchangeDollarLine />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
