import { Request, Response } from "express";
import { MangaService } from "../services/mangaService";

export class MangaController {
  service = new MangaService();

  createManga = async (request: Request, response: Response) => {
    const { title, author, categories } = request.body;

    if (!(title && author && categories)) {
      response.status(400).json("All input are necessary");
    }

    const result = await this.service.createManga({
      title,
      author,
      categories,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  };

  getMangas = async (request: Request, response: Response) => {
    const { page } = request.body;
    const mangas = await this.service.getMangas(page);

    if (!mangas || mangas instanceof Error) {
      return response.status(400).json("Mangas does not exist yet!");
    }

    return response.json(mangas);
  };

  updateManga = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { title, author, categories } = request.body;

    if (!(title && author && categories)) {
      response.status(400).json("All input are required");
    }

    const result = this.service.updateManga({
      id: parseInt(id),
      title,
      author,
      categories,
    });

    if (result instanceof Error) {
      return response.status(200).json(result.message);
    }

    return response.status(200).json("Manga updated with success!");
  };

  deleteManga = async (request: Request, response: Response) => {
    const { id } = request.params;

    const result = this.service.deleteManga(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json("Manga deleted with success!");
  };
}
