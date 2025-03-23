import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
try {
const { name, email, password } = req.body;
const userRepository = AppDataSource.getRepository(User);

const existingUser = await userRepository.findOne({ where: { email } });
if (existingUser) return res.status(400).json({ message: "Email already exists" });

const hashedPassword = await bcrypt.hash(password, 10);
const user = userRepository.create({ name, email, password: hashedPassword });
await userRepository.save(user);

res.status(201).json({ message: "User created successfully", user });
} catch (error) {
res.status(500).json({ message: "Error creating user", error });
}
};

// Delete User (Bob)
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const { id } = req.params;
  
      const user = await userRepository.findOne({ where: { id: Number(id) } });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      await userRepository.remove(user);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  };