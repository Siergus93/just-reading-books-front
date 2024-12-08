import { Book } from "./book";

export type BooksResponse = {
  page: number;
  limit: number;
  total: number;
  pages: number;
  data: Book[];
};
