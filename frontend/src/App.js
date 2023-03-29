import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { ROLES } from "./constants/constants";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";
import Home from "./components/Home";
import Assets from "./components/Assets/Assets";
import Users from "./components/Users/Users";

const App = () => {
  return (
    <div id="App" className="App">
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* protected routes */}
        <Route path="/" element={<Layout />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Owner, ROLES.Admin, ROLES.Dispatcher, ROLES.Updater]} />}>
            <Route path="assets" element={<Assets />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
