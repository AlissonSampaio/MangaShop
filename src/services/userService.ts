import { User, IUserMethods } from "../models/user/user";

export class UserService implements IUserMethods {
  genericUser = { id: "1", name: "Alisson", email: "", password: "" };

  async createUser({ name, email, password }: User) {
    return this.genericUser;
  }

  async getAllUsers(): Promise<User[]> {
    return [this.genericUser];
  }

  async getUserById(id: string): Promise<User> {
    return this.genericUser;
  }

  async updateUser(user: User) {
    return "";
  }

  async deleteUser(id: string): Promise<string> {
    return "";
  }
}
