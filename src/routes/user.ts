import { Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

const router = Router();

// GET /users - List all users
router.get("/", async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// GET /users/:id - Retrieve a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

export default router;
