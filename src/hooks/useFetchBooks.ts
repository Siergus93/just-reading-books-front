import { useEffect, useState } from "react";
import { BooksResponse } from "../types/booksResponse";

export type useFetchBooksProps = {
  page?: number | undefined;
  limit?: number | undefined;
  searchTitle?: string | undefined;
  searchAuthor?: string | undefined;
};

export const useFetchBooks = ({
  page = 1,
  limit = 10,
  searchTitle,
  searchAuthor,
}: useFetchBooksProps) => {
  const [response, setResponse] = useState<BooksResponse | null>(null);

  const refetchBooks = async ({
    page,
    limit,
    searchTitle,
    searchAuthor,
  }: useFetchBooksProps) => {
    let queryParams = `page=${page}&limit=${limit}`;

    if (searchTitle) {
      queryParams = queryParams + `&searchTitle=${searchTitle}`;
    }

    if (searchAuthor) {
      queryParams = queryParams + `&searchAuthor=${searchAuthor}`;
    }

    const result = await fetch(
      `http://localhost:3001/api/books/get?${queryParams}`
    );
    const data = await result.json();
    setResponse(data);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      let queryParams = `page=${page}&limit=${limit}`;

      if (searchTitle) {
        queryParams = queryParams + `&searchTitle=${searchTitle}`;
      }

      if (searchAuthor) {
        queryParams = queryParams + `&searchAuthor=${searchAuthor}`;
      }

      const result = await fetch(
        `http://localhost:3001/api/books/get?${queryParams}`
      );
      const data = await result.json();
      setResponse(data);
    };
    fetchBooks();
  }, []);

  return {
    response,
    refetchBooks,
  };
};
