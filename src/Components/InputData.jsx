import React from "react"; // Importing React library

// Importing AddItemContext from "../UseContext/UseContext"
import { AddItemContext } from "../UseContext/UseContext";
import Header from "./Header";
import DotLoader from "react-spinners/DotLoader";
// Define InputData functional component
const InputData = () => {
  // Destructure properties from AddItemContext
  const { formData, existing, columns, setLoading, loading, error } =
    AddItemContext();

  if (loading) {
    return (
      <div className="sweet-loading">
        <center>
          <DotLoader
            color={"#3641d6"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </center>
      </div>
    );
  }
  // Return JSX for InputData component

  return (
    <div className=" w-100">
      {" "}
      {/* Container div for styling */}
      <Header />
      <div>
        <div>
          {error && <h5>Data Not Found</h5>}
          {/* Other UI elements */}
        </div>{" "}
        {/* Nested div */}
        {/* Table for displaying data */}
        {!error && (
          <table className="table w-100   table-responsive table-striped table-bordered">
            <thead>
              {" "}
              {/* Table header */}
              <tr className="border">
                {" "}
                {/* Table row */}
                {/* Map through columns and render table headers */}
                <th>S.No</th>
                {columns.map((col) => {
                  return (
                    <>
                      <th key={col.id}>
                        {" "}
                        {/* Table header cell */}
                        {col} {/* Column name */}
                        {console.log(col)}
                      </th>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {" "}
              {/* Table body */}
              {/* Map through existing data and render table rows */}
              {existing.map((itemImage, index) => {
                return (
                  <>
                    {/* Table row */}
                    <tr
                      height={"10px"}
                      className="bg-primary"
                      key={itemImage.id}
                    >
                      {/* Table data cells */}
                      <td>{index + 1}</td> {/* ID column */}
                      <td>{itemImage.id}</td> {/* ID column */}
                      <td>{itemImage.itemname}</td> {/* Item Name column */}
                      <td>{itemImage.description}</td>{" "}
                      {/* Description column */}
                      <td>{itemImage.category}</td> {/* Category column */}
                      <td>{itemImage.manufacturer}</td>{" "}
                      {/* Manufacturer column */}
                      <td>{itemImage.unitOfMeasure || "NA"}</td>{" "}
                      {/* Unit of Measure column */}
                      <td>{itemImage.unitPrice}</td> {/* Unit Price column */}
                      <td>{itemImage.initialQuantity}</td>{" "}
                      {/* Initial Quantity column */}
                      <td>{itemImage.expirationDate}</td>{" "}
                      {/* Expiration Date column */}
                      <td>
                        {" "}
                        {/* Image column */}
                        <a
                          href={`images/${itemImage.imageUpload || "NA"}`}
                          target="_blank"
                        >
                          {" "}
                          {/* Image link */}
                          {/* Image */}
                          <img
                            src={`images/${itemImage.imageUpload}`}
                            alt="NA"
                            width={"10%"}
                            height={"100%"}
                          />
                        </a>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Export InputData component
export default InputData;
