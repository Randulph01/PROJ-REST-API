import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./ormconfig";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database!");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((error) => console.log(error));
