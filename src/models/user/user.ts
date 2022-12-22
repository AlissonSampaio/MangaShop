import { type } from "os";
import { Interface } from "readline";
import { v4 as uuid } from "uuid";

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export interface IUserMethods {
  createUser({ name, email, password }: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  updateUser(User: User): Promise<string>;
  deleteUser(id: string): Promise<string>;
}
