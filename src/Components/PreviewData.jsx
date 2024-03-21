import { Component, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddItemContext } from "../UseContext/UseContext";

function Example() {
  // Retrieve data from context
  const getData = AddItemContext();

  // Destructuring values from context
  const {
    formData,
    setFormData,
    handleFormSubmit,
    error,
    setError,
    existing,
    handleShow,
    handleClose,
    show,
    setShow,
  } = getData;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        style={{ zIndex: "9999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">PREVIEW ITEM</Modal.Title>
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
                <td>{formData.description}</td>
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
                <td>{formData.unitOfMeasure}</td>
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
                <td>{formData.expirationDate}</td>
              </tr>
              <tr>
                <th>Uploadimage </th>
                <img
                  src={`images/${formData.imageUpload}`}
                  alt=""
                  width={"40%"}
                />
              </tr>
            </thead>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Back
          </Button>
          <Button className="btn submit-btn"  onClick={handleFormSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
