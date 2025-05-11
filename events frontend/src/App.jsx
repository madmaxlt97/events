import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import UserList from "./components/UserList";
import EditUserForm from "./components/EditUserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/userslist" element={<UserList />} />
        <Route path="/edituser" element={<EditUserForm />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
