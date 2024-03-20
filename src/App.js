import React from "react";
import AddItems from "./Components/AddItem";
import InputData from "./Components/InputData";
import { Route, Router, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/data" element={<InputData />} />
      </Routes>
    </>
  );
}

export default App;
