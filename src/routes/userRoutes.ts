import { Router } from "express";
import { UserService } from "../services/UserService";

const router = Router();

router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserService.createUser(name, email, password);
  res.json(user);
});

router.get("/users", async (_, res) => {
  const users = await UserService.getAllUsers();
  res.json(users);
});

export default router;
