import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditUserForm from "./EditUserForm.jsx";
import API from "../api/axios.js";
import "./styles.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error while deleting user:", error);
    }
  };

  const handleEdit = async (id) => {
    const userToEdit = users.find((user) => user._id === id);
    setSelectedUser(userToEdit); // set the user to edit
    navigate("/edituser", { state: { userToEdit: userToEdit } }); // navigate to the edit user page
  };

  return (
    <div className="container">
      <div className="title">Registered Users</div>
      <div className="button-container">
        <button onClick={() => navigate("/register")}>Register New User</button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => handleEdit(user._id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserForm
          user={selectedUser}
          fetchUsers={fetchUsers}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
