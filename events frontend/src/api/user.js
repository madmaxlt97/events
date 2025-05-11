import API from "./axios";

export async function getAllUsers() {
  const { data } = await API.get("/users");
  return data;
}

export async function registerUser(userData) {
  const { data } = await API.post("/register", userData);
  return data;
}
