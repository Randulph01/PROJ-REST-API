import { Router } from "express";
import { User } from "../entities/User"; // import the User entity
import { AppDataSource } from "../ormconfig"; // import your AppDataSource

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Route to list all users
router.get("/users", async (req, res) => {
  try {
    const users = await userRepository.find(); // fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

// Route to retrieve a user by ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

export default router;
