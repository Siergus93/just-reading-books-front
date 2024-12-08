import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Book } from "../../types/book";

export type AddBookFormProps = {
  hideAddBookForm: () => void;
};

export const AddBookForm = ({ hideAddBookForm }: AddBookFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [pages, setPages] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const [createErrorDetails, setCreateErrorDetails] = useState<string>("");
  const [createValidationErrors, setCreateValidationErrors] = useState<
    Record<string, string>
  >({});

  return (
    <div>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          paddingLeft: "30px",
          paddingTop: "30px",
        }}
      >
        <TextField
          fullWidth
          label="title"
          id="title"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          fullWidth
          label="author"
          id="author"
          value={author}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAuthor(event.target.value);
          }}
        />
        <TextField
          fullWidth
          label="isbn"
          id="isbn"
          value={isbn}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setIsbn(event.target.value);
          }}
        />
        <TextField
          fullWidth
          label="pages"
          id="pages"
          value={pages}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPages(event.target.value);
          }}
        />
        <TextField
          fullWidth
          label="rating"
          id="rating"
          value={rating}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRating(event.target.value);
          }}
        />
        <Button
          sx={{ marginTop: "10px" }}
          onClick={async () => {
            const newBook: Book = {
              title,
              author,
              isbn,
              pages: parseInt(pages),
              rating: parseInt(rating),
            };

            const response = await fetch(
              "http://localhost:3001/api/books/add",
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook),
                method: "POST",
              }
            );
            const result: {
              ok: boolean;
              details: string;
              errors?: Record<string, string>;
            } = await response.json();

            if (result.ok) {
              hideAddBookForm();
            } else {
              setCreateErrorDetails(result.details);
              setCreateValidationErrors(result.errors ? result.errors : {});
            }
          }}
          variant="outlined"
        >
          Add
        </Button>
        {createErrorDetails !== "" && (
          <Alert sx={{ marginTop: "10px" }} severity="error">
            {createErrorDetails}
          </Alert>
        )}
        {Object.keys(createValidationErrors).map((key) => {
          const value = createValidationErrors[key];
          return (
            <Alert sx={{ marginTop: "10px" }} severity="error">
              {key} - {value}
            </Alert>
          );
        })}
      </Box>
    </div>
  );
};
