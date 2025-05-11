import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import RegValidationSchema from "../../../events backend/validationSchemas/RegValidationSchema.js";
import "./styles.css";

export default function EditUserForm({ fetchUsers }) {
  const location = useLocation();
  const user = location.state?.userToEdit;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [editUser, setEditUser] = useState({
    name: "",
    lastName: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (user) {
      setEditUser({
        name: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        age: user.age || "",
        _id: user._id,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = RegValidationSchema.validate(editUser, {
      allowUnknown: true,
    });

    if (error) {
      setErrorMessage(error.details[0].message);
      return;
    }

    try {
      await API.put(`/users/${editUser._id}`, editUser);
      console.log("User updated successfully");
      if (typeof fetchUsers === "function") {
        fetchUsers();
      }
      navigate("/userslist");
    } catch (error) {
      console.error("Failed to update user:", error);
      setErrorMessage("Failed to update user.");
    }
  };

  const handleCancel = () => {
    navigate("/userslist");
  };

  return (
    <div className="container">
      <div className="title">Edit User Form</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={editUser.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={editUser.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={editUser.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={editUser.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
