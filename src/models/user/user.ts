import { type } from "os";
import { Interface } from "readline";
import { v4 as uuid } from "uuid";

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export interface IUserMethods {
  createUser({ name, email, password }: User): Promise<User | Error>;
  getAllUsers(): Promise<User[] | Error>;
  getUserById(id: string): Promise<User | Error>;
  updateUser(User: User): Promise<User | Error>;
  deleteUser(id: string): Promise<User | Error>;
}
