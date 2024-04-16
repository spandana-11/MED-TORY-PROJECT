import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DotLoader from "react-spinners/DotLoader";
import Header from "./Header";
import { AddItemContext } from "../UseContext/UseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import ViewItemDetails from "./ViewItemDetails";

import Modal from "react-bootstrap/Modal";
import {
  faEye,
  faTrash,
  faPenToSquare,
  faDownload,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Route } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import { decomposeColor, withWidth } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const InputData = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState([]);

  // const handleViwShow = (id) => {
  //   setShow(true);
  //   axios
  //     .get("http://localhost:4800/ItemData/" + id)
  //     .then((res) => setData(res.data))
  //     .catch((err) => console.log(err));
  // };

  const {
    existing,
    columns,
    setLoading,
    loading,
    error,
    imagePreview,
    handleDelete,
    setExisting,
    reorderData,
    setReorderData,
    notificationShow,
    setNotificationShow,
    handleShow,
    filteredData,
    setFilteredData,
    handleViewShow,
    handleViwShow,
    handleEdit,
  } = AddItemContext();

  const [selectedRows, setSelectedRows] = useState([]);
  const [audio, setAudio] = useState(false);
  useEffect(() => {
    setFilteredData(existing);
  }, [existing]);

  const handleFilterChange = (e) => {
    const keyword = e.target.value.toLowerCase();
    console.log("Search Keyword:", keyword); // Log the search keyword
    const filteredResults = existing.filter(
      (item) =>
        item.itemname.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.manufacturer.toLowerCase().includes(keyword)
    );
    console.log("Filtered Results:", filteredResults); // Log the filtered results
    setFilteredData(filteredResults);
  };

  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      return;
    }

    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete the selected items?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then((result) => {
      if (result.isConfirmed) {
        const idsToDelete = selectedRows.map((row) => row.id);
        Promise.all(
          idsToDelete.map((id) =>
            axios
              .delete(`http://localhost:4800/ItemData/${id}`) // Adjust URL as per your API endpoint
              .then(() => {
                setExisting(existing.filter((item) => item.id !== id));
              })
          )
        )
          .then(() => {
            setSelectedRows([]);
            Swal.fire(
              "Deleted!",
              "Selected items have been deleted.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Failed to delete selected items:", error);
            Swal.fire("Error", "Failed to delete selected items.", "error");
          });
      }
    });
  };

  // const handleSingleDelete = (id) => {
  //   Swal.fire({
  //     title: "Confirm Deletion",
  //     text: "Are you sure you want to delete this item?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleDelete(id)
  //         .then(() => {
  //           setExisting(existing.filter((item) => item.id !== id));
  //           Swal.fire("Deleted!", "The item has been deleted.", "success");
  //         })
  //         .catch((error) => {
  //           Swal.fire("Error", "Failed to delete the item.", "error");
  //         });
  //     }
  //   });
  // };

  const column = [
    // {
    //   // width:"50px",
    //   name: "S.No",
    //   selector: (row, index) => index + 1,
    //   sortable: true,
    // },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      withWidth: "50px",
    },
    {
      name: "#SKU",
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.itemname,
      sortable: true,
    },
    // {
    //   name: "Description",
    //   selector: (row) => row.description || "NA",
    //   sortable: true,
    // },
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
    // {
    //   name: "Unit Of Measure",
    //   selector: (row) => row.unitOfMeasure,
    //   sortable: true,
    // },
    // {
    //   name: "Unit Price",
    //   selector: (row) => row.unitPrice,
    //   sortable: true,
    // },
    {
      name: "Initial Quantity",
      // selector: (row) => row.initialQuantity ,
      sortable: true,
      cell: (row) => (
        <div>
          <span>{row.initialQuantity}</span>
          <button
            onClick={() => handleDcecrement(row.id)}
            className="btn btn-primary"
          >
            -
          </button>
        </div>
      ),
    },
    // {
    //   name: "Expiration Date",
    //   selector: (row) => row.expirationDate || "NA",
    //   sortable: true,
    // },
    // {
    //   name: "Re-Order",
    //   selector: (row) => row.reorderLevel,
    //   sortable: true,
    // },
    // {
    //   name: "Supplier",

    //   selector: (row) => row.suppliers,

    //   sortable: true,
    // },
    {
      name: "Image Upload",
      selector: (row) => (
        <a href={row.imageUpload} target="_blank">
          <img
            src={row.imageUpload}
            alt={row.imageUpload || "Not Uploaded"}
            width={"30"}
          />
        </a>
      ),
      sortable: true,
      withWidth: "50px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="Icon_Btn p-2">
          <Button variant="success">
            <Link style={{ color: "white" }}>
              {" "}
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => handleViwShow(row.id)}
              />
            </Link>
          </Button>
          <Button variant="primary" className="mx-1 "
            
              style={{ color: "white" }}
              onClick={() => {
                handleEdit(row.id);
                navigate("/");
              }}
            >
              {" "}
              <FontAwesomeIcon icon={faPenToSquare} />
          
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      ),
    },
  ];

  const handleDcecrement = (id) => {
    // getReoderLevel(id);
    let audioCalled = false;
    const updatedData = filteredData.map((row) => {
      // if (row.initialQuantity === 0) {
      //   return row;
      // }
      if (row.id === id) {
        const newQty = row.initialQuantity - 10;

        if (newQty <= row.reorderLevel) {
          setReorderData([...reorderData, row]);
          audioCalled = true; // Set flag to true when audio is called for an item
          setAudio(true); // Trigger audio
          setNotificationShow(true);
        }
        return { ...row, initialQuantity: newQty };
      }
      return row;
    });

    setFilteredData(updatedData);
  };

  console.log(reorderData.length);

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#01063d",
        color: "white",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
      },
    },
  };

  const downloadPDF = () => {
    // Get the current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const doc = new jsPDF();

    doc.text("Inventory Report", 10, 10);
    doc.text(`Date: ${currentDate} Time: ${currentTime}`, 10, 18);
    const tableRows = filteredData.map((row, index) => [
      index + 1,
      row.id,
      row.itemname,
      row.category,
      row.manufacturer,
      row.initialQuantity,
    ]);
    doc.autoTable({
      head: [
        [
          "S.No",
          "ID",
          "Item Name",
          "Category",
          "Manufacturer",
          "Initial Quantity",
        ],
      ],

      body: tableRows,
      startY: 25,
    });
    doc.save("Inventory_Report.pdf");
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
        {audio && (
          <audio autoPlay>
            <source src="./Audio/Notification.mp3" />
          </audio>
        )}
        {error && <h5>Data Not Found</h5>}
        {!error && (
          <Card>
            <Card.Header>
              <h2>INVENTORY ITEMS</h2>
            </Card.Header>
            <Card.Body className="w-100 z-2">
              <div className="table-responsive ">
                <DataTable
                  className="data-table border p-0  "
                  columns={column}
                  data={filteredData}
                  pagination
                  selectableRows
                  customStyles={customStyles}
                  paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
                  selectableRowsHighlight
                  highlightOnHover
                  subHeader
                  subHeaderComponent={
                    <>
                      <div className="mt-3">
                        <Button
                          variant="danger"
                          onClick={handleDeleteSelected}
                          disabled={selectedRows.length === 0}
                          className="mx-2"
                        >
                          Delete Selected
                        </Button>
                        <Button
                          variant="primary"
                          className="ml-3"
                          onClick={downloadPDF}
                        >
                          <FontAwesomeIcon icon={faDownload} /> Download PDF
                        </Button>
                      </div>
                      <input
                        type="text"
                        placeholder="Search..."
                        className="form-control  "
                        autoFocus
                        style={{ width: "300px", marginLeft: "auto" }}
                        onChange={handleFilterChange}
                      />
                    </>
                  }
                  fixedHeader
                  fixedHeaderScrollHeight="400px"
                  onSelectedRowsChange={handleRowSelected}
                />
              </div>
            </Card.Body>
          </Card>
        )}
      </div>

      <ViewItemDetails />
    </div>
  );
};

export default InputData;
