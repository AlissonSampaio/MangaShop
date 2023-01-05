import { Router } from "express";
import { MangaController } from "../controllers/mangaController";

const mangaRoutes = Router();
const mangaController = new MangaController();

mangaRoutes.post("/", mangaController.createManga);
mangaRoutes.get("/", mangaController.getMangas);
mangaRoutes.put("/:id", mangaController.updateManga);
mangaRoutes.delete("/:id", mangaController.deleteManga);

export default mangaRoutes;
