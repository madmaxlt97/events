import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/userRouter.js";

dotenv.config();

const { PORT, MONGO_URI } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

mongoose
  .connect(MONGO_URI, {
    dbName: "events",
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
