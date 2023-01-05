import { PrismaClient } from "@prisma/client";
import { Category, ICategoryMethods } from "../models/category";

export class CategoryService implements ICategoryMethods {
  prisma = new PrismaClient();

  createCategory = async ({ name }: Category): Promise<Category | Error> => {
    const existentCategory = await this.prisma.category.findFirst({
      where: { name },
    });

    if (existentCategory) {
      throw new Error("Usuário já registrado");
    }

    let category;

    try {
      category = await this.prisma.category.create({
        data: {
          name,
        },
      });
    } catch (err) {
      return new Error(err);
    }

    return category;
  };

  getAllCategories = async (): Promise<Category[] | Error> => {
    const categories = await this.prisma.category.findMany();

    if (!categories) {
      return new Error("No categories found");
    }

    return categories;
  };

  updateCategory = async ({
    id,
    name,
  }: Category): Promise<Category | Error> => {
    let existentCategory;

    try {
      existentCategory = await this.prisma.category.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      return new Error(err);
    }

    if (existentCategory) {
      return new Error("Usuário");
    }

    let updatedCategory;

    try {
      updatedCategory = await this.prisma.category.update({
        where: { id },
        data: { name },
      });
    } catch (err) {
      throw new Error(err);
    }

    return updatedCategory;
  };

  deleteCategory = async (id: string): Promise<Category | Error> => {
    let existentCategory;

    try {
      existentCategory = await this.prisma.user.findFirst({
        where: {
          id: parseInt(id),
        },
      });
    } catch (err) {
      return new Error(err);
    }

    if (existentCategory) {
      return new Error("Category deleted with success!");
    }

    let deletedCategory;

    try {
      deletedCategory = this.prisma.category.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (err) {
      return new Error(err);
    }

    return deletedCategory;
  };
}
