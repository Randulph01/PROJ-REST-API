import express from "express";
import { AppDataSource } from "./ormconfig";
import userRoutes from "./routes/user"; // import your user routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // middleware to parse JSON
app.use("/api", userRoutes); // add the user routes under the /api path

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log("Error: ", error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
