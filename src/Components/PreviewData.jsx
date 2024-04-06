import { Component, useState } from "react";
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
  const { formData, handleFormSubmit, handleClose, show, imagePreview } =
    getData;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        style={{ zIndex: "9999" }}
      >
 
        <Modal.Header closeButton className="submit-btn">
          <Modal.Title className="title ">PREVIEW ITEM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table w-100  table-responsive table-striped table-bordered">
            <thead>
              <tr>
                <th className="w-50">ItemName</th>
                <td>{formData.itemname}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{formData.description || "NA"}</td>
              </tr>
              <tr>
                <th>Categories</th>
                <td>{formData.category}</td>
              </tr>
              <tr>
                <th>Manufactures</th>
                <td>{formData.manufacturer}</td>
              </tr>
              <tr>
                <th>Unit Measures</th>
                <td>{formData.unitOfMeasure || "NA"}</td>
              </tr>
              <tr>
                <th>Unit Price</th>
                <td>{formData.unitPrice}</td>
              </tr>
              <tr>
                <th>InitialQuantity</th>
                <td>{formData.initialQuantity}</td>
              </tr>
              <tr>
                <th>ExpireDate</th>
                <td>{formData.expirationDate || "NA"}</td>
              </tr>
              <tr>
                <th>Uploadimage </th>
                <td>
                  {" "}
                  {imagePreview ? "" : "Not Uploaded"}
                  <a
                    href={imagePreview}
                    target="_blank"
                    style={{ width: "100%" }}
                  >
                    <img
                      src={imagePreview || "NA"}
                      style={{
                        maxWidth: "30%",
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
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Back
          </Button>
          <Button className="btn submit-btn" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
