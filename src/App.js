import React from "react";
import AddItems from "./Components/AddItem";
import InputData from "./Components/InputData";
import { Route, Router, Routes } from "react-router-dom";
 import PreviewData from './Components/PreviewData'
import UpdateInventoryItems from "./Components/UpadateInventoryItem";
import Notification from "./Components/Notification";
import ViewItemDetails from "./Components/ViewItemDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/data" element={<InputData />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="update/:id" element={<UpdateInventoryItems />} />
        {/* <Route path="/view" element={<ViewItemDetails />} /> */}
      </Routes>
      <PreviewData/>
    </>
  );
}

export default App;
