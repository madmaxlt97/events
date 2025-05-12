import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import RegValidationSchema from "../../../events backend/validationSchemas/RegValidationSchema.js";
import "./styles.css";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = RegValidationSchema.validate(newUser, {
      allowUnknown: true,
    });

    if (error) {
      setErrorMessage(error.details[0].message);
      return;
    }

    try {
      await API.post("/register", newUser);
      console.log("User registered successfully");
      navigate("/userslist");
    } catch (error) {
      console.error("Failed to register user:", error);
      setErrorMessage("Failed to register user.");
    }
  };

  return (
    <div className="container">
      <div className="title">Registration Form</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          value={newUser.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <button type="submit" id="reg-btn">
          Register
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="button-container" id="see-all-users">
        <button onClick={() => navigate("/userslist")}>
          See all registered users
        </button>
      </div>
    </div>
  );
}
