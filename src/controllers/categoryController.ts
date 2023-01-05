import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  service = new CategoryService();

  createCategory = async (request: Request, response: Response) => {
    const { name } = request.body;

    if (!name) {
      response.status(400).json("A name is necessary in categories");
    }

    const result = await this.service.createCategory({
      name,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  };

  getAllCategories = async (request: Request, response: Response) => {
    const categories = await this.service.getAllCategories();

    if (!categories || categories instanceof Error) {
      return response.status(400).json("Categories does not exist yet!");
    }

    return response.json(categories);
  };

  updateCategory = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      response.status(400).json("All input are required");
    }

    const result = this.service.updateCategory({
      id: parseInt(id),
      name,
    });

    if (result instanceof Error) {
      return response.status(200).json(result.message);
    }

    return response.status(200).json("Category updated with success!");
  };

  deleteCategory = async (request: Request, response: Response) => {
    const { id } = request.params;

    const result = this.service.deleteCategory(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json("Category deleted with success!");
  };
}
