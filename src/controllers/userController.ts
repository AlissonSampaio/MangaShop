import { Request, Response } from "express";
import { json } from "stream/consumers";
import { UserService } from "../services/userService";

export class UserController {
  service = new UserService();

  createUser = async (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    if (!(name && email && password)) {
      response.status(400).json("All input are required");
    }

    const result = await this.service.createUser({
      name,
      email,
      password,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  };

  getAllUsers = async (request: Request, response: Response) => {
    const users = await this.service.getAllUsers();

    if (!users || users instanceof Error) {
      return response.status(400).json("Users does not exist!");
    }

    return response.json(users);
  };

  getUserById = async (request: Request, response: Response) => {
    const { id } = request.params;

    const user = this.service.getUserById(id);

    if (!user) {
      return response.status(400).json("User does not exist!");
    }

    return response.status(200).json(user);
  };

  updateUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, email, password } = request.body;

    if (!(name && email && password)) {
      response.status(400).json("All input are required");
    }

    const result = this.service.updateUser({
      id: parseInt(id),
      name,
      email,
      password,
    });

    if (result instanceof Error) {
      return response.status(200).json(result.message);
    }

    return response.status(200).json("User updated with success!");
  };

  deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;

    const result = this.service.deleteUser(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json("User deleted with success!");
  };
}
