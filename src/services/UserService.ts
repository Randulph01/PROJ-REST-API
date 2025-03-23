import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

export class UserService {
  static async createUser(name: string, email: string, password: string) {
    const user = UserRepository.create({ name, email, password });
    return await UserRepository.save(user);
  }

  static async getAllUsers() {
    return await UserRepository.find();
  }
}
