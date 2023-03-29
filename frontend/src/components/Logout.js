import { Navigate } from "react-router-dom";

const Logout = () => {
  window.localStorage.setItem("auth", "");
  return <Navigate to={"/login"} />;
};

export default Logout;
