// import icons
import { BsPencil } from "react-icons/bs";
import { USER_ROLES } from "../../constants/constants";
import { getChoice } from "../../functions/Functions";

const UsersTable = ({ users, handleEdit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>№</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Username</th>
          <th>User role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{getChoice(user.role, USER_ROLES)}</td>
              <td>
                <div className="actions">
                  <div
                    className="icon-holder"
                    onClick={() => {
                      handleEdit(user);
                    }}
                    title="edit"
                  >
                    <BsPencil className="icon edit" />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersTable;
