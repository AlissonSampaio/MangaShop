import { Category } from "./category";

export type Manga = {
  id?: number;
  title: string;
  author: string;
  comments?: Comment[];
  categories: Category[];
};

export interface IMangaMethods {
  createManga({ title, author, categories }: Manga): Promise<Manga | Error>;
  getMangas(page: number): Promise<Manga[] | Error>;
  updateManga(manga: Manga): Promise<Manga | Error>;
  deleteManga(id: string): Promise<Manga | Error>;
}
