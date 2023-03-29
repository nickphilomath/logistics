import { useState, useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { USER_ROLES, USERS_URL } from "../../constants/constants";
import LoadingButton from "../../common/LoadingButton";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Checkbox from "../../common/Checkbox";

const UsersForm = ({ closeForm, method, edit }) => {
  const { errors, post, put, isLoading } = useRequest(USERS_URL);
  const [log, setLog] = useState(
    method === "PUT"
      ? { ...edit.appuser, ...edit }
      : {
          first_name: "",
          last_name: "",
          role: "DIS",
          username: "",
          password: "",
          // appuser
          is_active: false,
          view_user: false,
          create_user: false,
          update_user: false,
          activate_user: false,
          view_driver: false,
          create_driver: false,
          update_driver: false,
          activate_driver: false,
          view_carrier: false,
          create_carrier: false,
          update_carrier: false,
          activate_carrier: false,
          view_vehicle: false,
          create_vehicle: false,
          update_vehicle: false,
          activate_vehicle: false,
          view_trailer: false,
          create_trailer: false,
          update_trailer: false,
          activate_trailer: false,
        }
  );

  const handleChange = ({ currentTarget: input }) => {
    const newLog = { ...log };
    if (input.type == "checkbox") {
      if (input.name.includes("all_")) {
        let value = !newLog[input.name];
        let row_name = input.name.split("_")[1];
        newLog[input.name] = value;
        newLog["view_" + row_name] = value;
        newLog["create_" + row_name] = value;
        newLog["update_" + row_name] = value;
        newLog["activate_" + row_name] = value;
      } else {
        newLog[input.name] = !newLog[input.name];
      }
    } else {
      newLog[input.name] = input.value;
    }
    setLog(newLog);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // post or put to server
    let response;
    if (method == "POST") response = await post(log);
    if (method == "PUT") response = await put(log);
    if (response) closeForm({ reload: true });
    console.log(response);
  };

  const handelCancel = (e) => {
    e.preventDefault();
    closeForm({ reload: false });
  };

  return (
    <div className="focus-area">
      <div className="form">
        <div className="form-info">
          {method === "POST" ? (
            <>
              <h1>Create a new user</h1>
              <p>Follow these instructions to create a new user. Once created, the user will be able to access the website with the chosen credentials.</p>
            </>
          ) : (
            <>
              <h1>Update the existing user</h1>
            </>
          )}
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <Input name="first_name" type="text" value={log.first_name} label="First name" onChange={handleChange} error={errors.first_name} />
            <Input name="last_name" type="text" value={log.last_name} label="Last name" onChange={handleChange} error={errors.last_name} />

            <Input name="username" type="text" value={log.username} label="Username" onChange={handleChange} error={errors.username} />
            <Select name="role" selections={USER_ROLES} isObject={true} value={log.role} label="User role" onChange={handleChange} error={errors.role} />

            {method === "POST" && <Input name="password" type="password" value={log.password} label="Password" onChange={handleChange} error={errors.password} />}
            <h4 style={{ margin: "20px 10px" }}>Permissions:</h4>
            <div className="permission-table">
              <div className="row">
                <p>User</p>
                <ul>
                  <li>
                    <Checkbox name="view_user" label="View" checked={log.view_user} onChange={handleChange} error={errors.view_user} />
                  </li>
                  <li>
                    <Checkbox name="create_user" label="Create" checked={log.create_user} onChange={handleChange} error={errors.create_user} />
                  </li>
                  <li>
                    <Checkbox name="update_user" label="Update" checked={log.update_user} onChange={handleChange} error={errors.update_user} />
                  </li>
                  <li>
                    <Checkbox name="activate_user" label="Activate" checked={log.activate_user} onChange={handleChange} error={errors.activate_user} />
                  </li>
                  <li>
                    <Checkbox name="all_user" label="All" checked={log.all_user} onChange={handleChange} error={null} />
                  </li>
                </ul>
              </div>
              <div className="row">
                <p>Driver</p>
                <ul>
                  <li>
                    <Checkbox name="view_driver" label="View" checked={log.view_driver} onChange={handleChange} error={errors.view_driver} />
                  </li>
                  <li>
                    <Checkbox name="create_driver" label="Create" checked={log.create_driver} onChange={handleChange} error={errors.create_driver} />
                  </li>
                  <li>
                    <Checkbox name="update_driver" label="Update" checked={log.update_driver} onChange={handleChange} error={errors.update_driver} />
                  </li>
                  <li>
                    <Checkbox name="activate_driver" label="Activate" checked={log.activate_driver} onChange={handleChange} error={errors.activate_driver} />
                  </li>
                  <li>
                    <Checkbox name="all_driver" label="All" checked={log.all_driver} onChange={handleChange} error={null} />
                  </li>
                </ul>
              </div>
              <div className="row">
                <p>Carriers</p>
                <ul>
                  <li>
                    <Checkbox name="view_carrier" label="View" checked={log.view_carrier} onChange={handleChange} error={errors.view_carrier} />
                  </li>
                  <li>
                    <Checkbox name="create_carrier" label="Create" checked={log.create_carrier} onChange={handleChange} error={errors.create_carrier} />
                  </li>
                  <li>
                    <Checkbox name="update_carrier" label="Update" checked={log.update_carrier} onChange={handleChange} error={errors.update_carrier} />
                  </li>
                  <li>
                    <Checkbox name="activate_carrier" label="Activate" checked={log.activate_carrier} onChange={handleChange} error={errors.activate_carrier} />
                  </li>
                  <li>
                    <Checkbox name="all_carrier" label="All" checked={log.all_carrier} onChange={handleChange} error={null} />
                  </li>
                </ul>
              </div>
              <div className="row">
                <p>Vehicle</p>
                <ul>
                  <li>
                    <Checkbox name="view_vehicle" label="View" checked={log.view_vehicle} onChange={handleChange} error={errors.view_vehicle} />
                  </li>
                  <li>
                    <Checkbox name="create_vehicle" label="Create" checked={log.create_vehicle} onChange={handleChange} error={errors.create_vehicle} />
                  </li>
                  <li>
                    <Checkbox name="update_vehicle" label="Update" checked={log.update_vehicle} onChange={handleChange} error={errors.update_vehicle} />
                  </li>
                  <li>
                    <Checkbox name="activate_vehicle" label="Activate" checked={log.activate_vehicle} onChange={handleChange} error={errors.activate_vehicle} />
                  </li>
                  <li>
                    <Checkbox name="all_vehicle" label="All" checked={log.all_vehicle} onChange={handleChange} error={null} />
                  </li>
                </ul>
              </div>
              <div className="row">
                <p>Trailer</p>
                <ul>
                  <li>
                    <Checkbox name="view_trailer" label="View" checked={log.view_trailer} onChange={handleChange} error={errors.view_trailer} />
                  </li>
                  <li>
                    <Checkbox name="create_trailer" label="Create" checked={log.create_trailer} onChange={handleChange} error={errors.create_trailer} />
                  </li>
                  <li>
                    <Checkbox name="update_trailer" label="Update" checked={log.update_trailer} onChange={handleChange} error={errors.update_trailer} />
                  </li>
                  <li>
                    <Checkbox name="activate_trailer" label="Activate" checked={log.activate_trailer} onChange={handleChange} error={errors.activate_trailer} />
                  </li>
                  <li>
                    <Checkbox name="all_trailer" label="All" checked={log.all_trailer} onChange={handleChange} error={null} />
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <div className="row buttons-container">
          <p></p>
          <div className="buttons">
            <button onClick={handelCancel} className="cancel">
              Cancel
            </button>
            {isLoading ? (
              <LoadingButton className={"save"} />
            ) : (
              <button className="save" onClick={handleSubmit}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersForm;
