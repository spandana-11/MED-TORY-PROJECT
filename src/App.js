import React from "react";
import AddItems from "./Components/AddItem";
import InputData from "./Components/InputData";
import { Route, Router, Routes } from "react-router-dom";
 import PreviewData from './Components/PreviewData'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/data" element={<InputData />} />
      </Routes>
      <PreviewData/>
    </>
  );
}

export default App;
