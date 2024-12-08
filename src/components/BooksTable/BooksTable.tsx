import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import { useState } from "react";

export type BooksTableProps = {
  showAddBookForm: () => void;
};

export const BooksTable = ({ showAddBookForm }: BooksTableProps) => {
  const { response, refetchBooks } = useFetchBooks({});
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchAuthor, setSearchAuthor] = useState<string>("");

  return (
    <div>
      <div>
        <div>
          <button onClick={() => showAddBookForm()}>Add book</button>
        </div>
        <button
          disabled={page <= 1}
          onClick={() => {
            const newPage = page - 1;
            refetchBooks({ page: newPage, limit });
            setPage(newPage);
          }}
        >
          Previous page
        </button>
        <button
          disabled={page >= (response?.pages ?? 1)}
          onClick={() => {
            const newPage = page + 1;
            refetchBooks({ page: newPage, limit });
            setPage(newPage);
          }}
        >
          Next page
        </button>
        <select
          onChange={(e) => {
            const newLimit = parseInt(e.target.value) || 10;
            setLimit(newLimit);
            refetchBooks({ page, limit: newLimit });
          }}
          name="selectLimit"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <input
          onChange={(e) => {
            setSearchTitle(e.target.value);
          }}
          placeholder="search for title"
          value={searchTitle}
        />
        <input
          onChange={(e) => {
            setSearchAuthor(e.target.value);
          }}
          placeholder="search for author"
          value={searchAuthor}
        />
        <button
          onClick={() => {
            refetchBooks({ page, limit, searchTitle, searchAuthor });
          }}
        >
          Search
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Pages</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {response?.data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.isbn}</TableCell>
                <TableCell>{row.pages}</TableCell>
                <TableCell>{row.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
