import { useState } from "react";
import "./App.css";
import { AddBookForm } from "./components/AddBookForm/AddBookForm";
import { BooksTable } from "./components/BooksTable/BooksTable";

function App() {
  const [createMode, setCreateMode] = useState<boolean>(false);

  const hideAddBookForm = () => {
    setCreateMode(false);
  };
  const showAddBookForm = () => {
    setCreateMode(true);
  };

  return (
    <div className="App">
      {createMode && <AddBookForm hideAddBookForm={hideAddBookForm} />}
      {!createMode && <BooksTable showAddBookForm={showAddBookForm} />}
    </div>
  );
}

export default App;
