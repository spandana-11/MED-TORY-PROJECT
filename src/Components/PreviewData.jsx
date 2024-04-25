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

          <div className="table-flex">
            {/* SKU */}
            <div className="row-flex col-6">
              <b className="w-50">#SKU</b>
              <p>{formDataWithSKU.sku}</p>
            </div>

            {/* Item Name */}
            <div className="row-flex  col-6">
              <b className="w-50">ItemName</b>
              <p>{formData.itemname}</p>
            </div>

            {/* Description */}
            <div className="row-flex col-6">
              <b className="w-50">Description</b>
              <p>{formData.description || "NA"}</p>
            </div>

            {/* Category */}
            <div className="row-flex col-6">
              <b className="w-50">Categories</b>
              <p>{formData.category}</p>
            </div>

            {/* Manufacturer */}
            <div className="row-flex col-6">
              <b className="w-50">Manufactures</b>
              <p>{formData.manufacturer}</p>
            </div>

            {/* Unit of Measure */}
            <div className="row-flex col-6">
              <b className="w-50">Unit Measures</b>
              <p>{formData.unitOfMeasure || "NA"}</p>
            </div>

            {/* Unit Price */}
            <div className="row-flex col-6">
              <b className="w-50">Unit Price</b>
              <p>{formData.unitPrice}</p>
            </div>

            {/* Initial Quantity */}
            <div className="row-flex col-6">
              <b className="w-50">InitialQuantity</b>
              <p>{formData.initialQuantity}</p>
            </div>

            {/* Re-Order Level */}
            <div className="row-flex col-6">
              <b className="w-50">Re-Order Level</b>
              <p>{formData.reorderLevel}</p>
            </div>

            {/* Suppliers */}
            <div className="row-flex col-6">
              <b className="w-50">supplies</b>
              <p>{formData.suppliers}</p>
            </div>

            {/* Expiry Date */}
            <div className="row-flex col-6">
              <b className="w-50">ExpireDate</b>
              <p>{formData.expirationDate || "NA"}</p>
            </div>

            {/* Uploaded Image */}
            <div className="row-flex col-6">
              <b className="w-50">Uploadimage </b>
              <div>
                
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
              </div>
            </div>
          </div>
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
