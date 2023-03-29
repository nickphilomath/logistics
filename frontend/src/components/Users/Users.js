import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";
import Loading from "../../common/Loading";
import { USERS_URL } from "../../constants/constants";
import "./Users.css";

const Users = () => {
  const request = useRequest(USERS_URL);

  useEffect(() => {
    request.get();
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [edit, setEdit] = useState({});
  const [method, setMethod] = useState("POST");

  const closeForm = ({ reload }) => {
    setFormOpen(false);
    if (reload) {
      request.get();
    }
  };

  const handleEdit = (handle) => {
    setEdit(handle);
    setMethod("PUT");
    setFormOpen(true);
  };

  return (
    <div className="container users">
      <div className="row head">
        <h1>Users</h1>
        <button
          className="button"
          onClick={() => {
            setMethod("POST");
            setFormOpen(true);
          }}
        >
          Add User
        </button>
      </div>
      {request.isLoading ? <Loading /> : <UsersTable users={request.data} handleEdit={handleEdit} />}
      {formOpen && <UsersForm closeForm={closeForm} method={method} edit={edit} />}
    </div>
  );
};

export default Users;
