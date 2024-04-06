import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DotLoader from "react-spinners/DotLoader";
import Header from "./Header";
import { AddItemContext } from "../UseContext/UseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const InputData = () => {
  const {
    formData,
    existing,
    columns,
    setLoading,
    loading,
    error,
    imagePreview,
    handleDelete,
  } = AddItemContext();

  const [filteredData, setFilteredData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1); // Current page state

  useEffect(() => {
    setFilteredData(existing);
  }, [existing]);

  const handleFilterChange = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredResults = existing.filter(
      (item) =>
        item.itemname.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.manufacturer.toLowerCase().includes(keyword)
    );
    setFilteredData(filteredResults);
    setCurrentPage(1); // Reset current page to 1 when filtering
  };

  const column = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.itemname,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Manufacturer",
      selector: (row) => row.manufacturer,
      sortable: true,
    },
    {
      name: "Unit Of Measure",
      selector: (row) => row.unitOfMeasure,
      sortable: true,
    },
    {
      name: "Unit Price",
      selector: (row) => row.unitPrice,
      sortable: true,
    },
    {
      name: "Initial Quantity",
      selector: (row) => row.initialQuantity,
      sortable: true,
    },
    {
      name: "Expiration Date",
      selector: (row) => row.expirationDate,
      sortable: true,
    },
    {
      name: "Image Upload",
      selector: (row) => row.imageUpload,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="Icon_Btn">
          <Button variant="success">
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button variant="primary" className="mx-1 ">
            <Link to={`/update/${row.id}`}  style={{color:"white"}}>
              {" "}
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ];
  const customStyles = {
    table: {
      style: {
        
        padding:"25px" // Add border style
      },
    },
    header: {
      style: {
        fontWeight: "800", // Make table header bold
      },
    },
  };
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

  return (
    <div>
      <Header />
      <div>
        {error && <h5>Data Not Found</h5>}
        {!error && (
          <Card>
            <Card.Header>
              <h2>INVENTORY ITEMS</h2>
            </Card.Header>
            <Card.Body className="w-100">
              <div className="table-responsive">
                <input
                  type="text"
                  placeholder="Serach..."
                  className="form-control mb-4 "
                  autoFocus
                  style={{ width: "300px", marginLeft: "auto" }}
                  onChange={handleFilterChange}
                />
                <DataTable  className="data-table border p-0"
                  columns={column}
                  data={filteredData}
                  pagination
                  selectableRows
                  customStyles={customStyles}
                  paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
                />
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InputData;
<>
  {/* <table className="table   table-striped table-bordered">
<thead>
  <tr className="border text-center">
    <th>S.No</th>
    
    {columns.map((col, index) => (
      <th key={index}>{col}</th>
    ))}
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  
  {existing.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.id}</td>
      <td>{item.itemname}</td>
      <td
        className="line-clamp description"
        title={item.description}
      >
        {item.description}
      </td>
      <td style={{ minWidth: "250px" }}>{item.category}</td>
      <td style={{ maxWidth: "150px" }}>{item.manufacturer}</td>
      <td>{item.unitOfMeasure || "NA"}</td>
      <td>{item.unitPrice}</td>
      <td>{item.initialQuantity}</td>
      <td>{item.expirationDate || "NA"}</td>
      <td>
        <a href={item.imageUpload || "NA"} target="_blank">
          <img
            className="line-clamp"
            title={item.imageUpload}
            src={`images/${item.imageUpload}`}
            alt={item.imageUpload || "NA"}
            width="50"
            height="50"
          />
        </a>
      </td>

     
      <td className="Icon_Btn">
        <Button variant="success" className="mx-1">
          <FontAwesomeIcon icon={faEye} />
        </Button>
        <Link to={`/update/${item.id}`}>
          {" "}
          <Button variant="primary">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Link>
        <Button
          variant="danger"
          className="mx-1"
          onClick={() => handleDelete(item.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  ))}
</tbody>
</table> */}
</>;
