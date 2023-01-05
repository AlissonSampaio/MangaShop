import { PrismaClient } from "@prisma/client";
import { Manga, IMangaMethods } from "../models/manga";

export class MangaService implements IMangaMethods {
  prisma = new PrismaClient();

  createManga = async ({
    title,
    author,
    categories,
  }: Manga): Promise<Manga | Error> => {
    const existentManga = await this.prisma.manga.findFirst({
      where: { title },
    });

    if (existentManga) {
      throw new Error("Mangá já registrado");
    }

    let manga;

    try {
      manga = await this.prisma.manga.create({
        data: {
          title,
          author,
          categories: { create: categories },
        },
      });
    } catch (err) {
      return new Error(err);
    }

    return manga;
  };

  getMangas = async (page: number): Promise<Manga[] | Error> => {
    const manga = await this.prisma.manga.findMany({
      include: { categories: true },
      skip: page * 10 ?? 0,
      take: 10,
    });

    if (!manga) {
      return new Error("No categories found");
    }

    return manga;
  };

  updateManga = async ({
    id,
    title,
    author,
    categories,
  }: Manga): Promise<Manga | Error> => {
    let existentManga;

    try {
      existentManga = await this.prisma.manga.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      return new Error(err);
    }

    if (existentManga) {
      return new Error("Mangá já existente");
    }

    let updatedManga;

    try {
      updatedManga = await this.prisma.manga.update({
        where: { id },
        data: { title, author, categories: { create: categories } },
      });
    } catch (err) {
      throw new Error(err);
    }

    return updatedManga;
  };

  deleteManga = async (id: string): Promise<Manga | Error> => {
    let existentManga;

    try {
      existentManga = await this.prisma.manga.findFirst({
        where: {
          id: parseInt(id),
        },
      });
    } catch (err) {
      return new Error(err);
    }

    if (existentManga) {
      return new Error("Manga deleted with success!");
    }

    let deletedManga;

    try {
      deletedManga = this.prisma.manga.delete({
        where: {
          id: parseInt(id),
        },
      });
    } catch (err) {
      return new Error(err);
    }

    return deletedManga;
  };
}
