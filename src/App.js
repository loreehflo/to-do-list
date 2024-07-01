import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import EditItem from "./components/EditItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/index" element={<TodoList />} />
        <Route path="/todo/:index" element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;
