import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddItemContext } from "../UseContext/UseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";

function Example() {
  // Retrieve data from context
  const getData = AddItemContext();

  // Destructuring values from context
  const {
    formData,
    handleFormSubmit,
    handleClose,
    show,
    editBtn,
    imagePreview,
    formDataWithSKU,
  } = getData;

  return (
    <>
      {/* Modal for previewing the item */}
      <Modal
        show={show} // Show modal if show state is true
        onHide={handleClose} // Function to handle modal close event
        animation={false} // Disable animation for better performance
        style={{ zIndex: "9999" }} // Set z-index to ensure modal appears on top
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* Modal header */}
        <Modal.Header closeButton className="submit-btn">
          <Modal.Title className="title ">PREVIEW ITEM</Modal.Title>
        </Modal.Header>

        {/* Modal body */}
        <Modal.Body>
          {/* Table to display item details */}
          <table className="table w-100  table-responsive table-striped table-bordered d-flex">
            <thead>
              {/* SKU */}
              <tr>
                <th className="w-50">#SKU</th>
                <td>{formDataWithSKU.sku}</td>
              </tr>

              {/* Item Name */}
              <tr>
                <th className="w-50">ItemName</th>
                <td>{formData.itemname}</td>
              </tr>

              {/* Description */}
              <tr>
                <th>Description</th>
                <td>{formData.description || "NA"}</td>
              </tr>

              {/* Category */}
              <tr>
                <th>Categories</th>
                <td>{formData.category}</td>
              </tr>

              {/* Manufacturer */}
              <tr>
                <th>Manufactures</th>
                <td>{formData.manufacturer}</td>
              </tr>

              {/* Unit of Measure */}
              <tr>
                <th>Unit Measures</th>
                <td>{formData.unitOfMeasure || "NA"}</td>
              </tr>
            </thead>
            <thead>
              {/* Unit Price */}
              <tr>
                <th>Unit Price</th>
                <td>{formData.unitPrice}</td>
              </tr>

              {/* Initial Quantity */}
              <tr>
                <th>InitialQuantity</th>
                <td>{formData.initialQuantity}</td>
              </tr>

              {/* Re-Order Level */}
              <tr>
                <th>Re-Order Level</th>
                <td>{formData.reorderLevel}</td>
              </tr>

              {/* Suppliers */}
              <tr>
                <th>supplies</th>
                <td>{formData.suppliers}</td>
              </tr>

              {/* Expiry Date */}
              <tr>
                <th>ExpireDate</th>
                <td>{formData.expirationDate || "NA"}</td>
              </tr>

              {/* Uploaded Image */}
              <tr>
                <th>Uploadimage </th>
                <td>
                  {formData.imageUpload ? "" : "Not Uploaded"}{" "}
                  {/* Display message if image not uploaded */}
                  <a
                    href={formData.imageUpload}
                    target="_blank"
                    style={{ width: "100%" }}
                  >
                    {/* Display uploaded image */}
                    <img
                      src={formData.imageUpload || "NA"}
                      style={{
                        maxWidth: "100%",
                        padding: "5px",
                        maxHeight: "50px",
                      }}
                    />
                  </a>
                </td>
              </tr>
            </thead>
          </table>
        </Modal.Body>

        {/* Modal footer */}
        <Modal.Footer>
          {/* Back button */}
          <Button variant="warning" onClick={handleClose}>
            Back
          </Button>

          {/* Submit button */}
          <Button className="btn submit-btn" onClick={handleFormSubmit}>
            {editBtn ? "Updade" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
