import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import userRoutes from "./routes/user";

const app = express();
const PORT = 3000;

app.use(express.json());

createConnection()
  .then(() => {
    console.log("Connected to database");

    // Register routes
    app.use("/users", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
