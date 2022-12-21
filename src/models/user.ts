import { type } from "os";
import { Interface } from "readline";
import { v4 as uuid } from "uuid";

type User = {
  name?: string;
  email: string;
  password: string;
};

type UserLoginRequest = {
  email: string;
  password: string;
};

export class UserMethods {
  createUser: (User) => string;
  getUser: () => string;
  updateUser: (User) => string;
  deleteUser: (User) => string;
  userLogin: (UserLoginRequest) => string;
}
