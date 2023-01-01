import { User, IUserMethods } from "../models/user/user";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export class UserService implements IUserMethods {
  prisma = new PrismaClient();

  createUser = async ({
    name,
    email,
    password,
  }: User): Promise<User | Error> => {
    const existentUser = await this.prisma.user.findFirst({
      where: { name },
    });

    if (existentUser) {
      throw new Error("Usuário já registrado");
    }

    let user;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
      user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: encryptedPassword,
        },
      });
    } catch (err) {
      return new Error(err);
    }

    return user;
  };

  getAllUsers = async (): Promise<User[] | Error> => {
    const users = await this.prisma.user.findMany();

    if (!users) {
      return new Error("No users found");
    }

    return users;
  };

  getUserById = async (id: string): Promise<User | Error> => {
    const user = await this.prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return new Error("Usuario não encontrado");
    }

    return user;
  };

  updateUser = async ({
    id,
    name,
    email,
    password,
  }: User): Promise<User | Error> => {
    let existentUser;

    try {
      existentUser = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      return new Error(err);
    }

    if (existentUser) {
      return new Error("Usuário");
    }

    let updatedUser;

    try {
      updatedUser = await this.prisma.user.update({
        where: { id },
        data: { name, email, password },
      });
    } catch (err) {
      throw new Error(err);
    }

    return updatedUser;
  };

  deleteUser = async (id: string): Promise<User | Error> => {
    let existentUser;

    try {
      existentUser = await this.prisma.user.findFirst({
        where: {
          id: parseInt(id),
        },
      });
    } catch (err) {
      return new Error(err);
    }

    if (existentUser) {
      return new Error("Usuário");
    }

    let deletedUser;

    try {
      deletedUser = this.prisma.user.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (err) {
      return new Error(err);
    }

    return deletedUser;
  };
}
