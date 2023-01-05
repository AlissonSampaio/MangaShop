export type Category = {
  id?: number;
  name: string;
};

export interface ICategoryMethods {
  createCategory({ name }: Category): Promise<Category | Error>;
  getAllCategories(): Promise<Category[] | Error>;
  updateCategory(category: Category): Promise<Category | Error>;
  deleteCategory(id: string): Promise<Category | Error>;
}
