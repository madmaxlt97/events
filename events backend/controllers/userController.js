import UserModel from "../models/UserModel.js";
import RegValidationSchema from "../validationSchemas/RegValidationSchema.js";

export async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error while getting all users" });
  }
}

export async function registerUser(req, res) {
  const body = req.body;
  try {
    const { error } = RegValidationSchema.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message }); // Validation error
    }

    const existingUser = await UserModel.findOne({ email: body.email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const newUser = new UserModel(body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUserById(req, res) {
  const { id } = req.params;
  const { name, lastName, email, age } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.age = age || user.age;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUserById(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: "User not found!" });

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
