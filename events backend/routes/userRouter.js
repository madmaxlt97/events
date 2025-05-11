import express from "express";
import {
  getAllUsers,
  registerUser,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/register", registerUser);
router.put("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);

export default router;
