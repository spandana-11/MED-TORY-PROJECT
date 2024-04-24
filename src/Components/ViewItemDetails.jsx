import { Component, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddItemContext } from "../UseContext/UseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
function Example() {
  // Retrieve data from context
  const getData = AddItemContext();

  // Destructuring values from context
  const {
    imagePreview,

    data,
    viewshow,
    setviewshow,
  } = getData;

  console.log(data.sku);

  //     <>
  //       <Modal
  //         show={show}
  //         onHide={handleClose}
  //         animation={false}

  //       >
  //         <Modal.Header closeButton className="submit-btn">
  //           <Modal.Title className="title ">PREVIEW ITEM</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //             {data.id}
  //             {data.itemname}
  //           {/* <table className="table w-100  table-responsive table-striped table-bordered">
  //             <thead>
  //               <tr>
  //                 <th className="w-50">#SKU</th>
  //                 <td>{data.sku}</td>
  //               </tr>
  //               <tr>
  //                 <th className="w-50">ItemName</th>
  //                 <td>{data.itemname}</td>
  //               </tr>
  //               <tr>
  //                 <th>Description</th>
  //                 <td>{data.description || "NA"}</td>
  //               </tr>
  //               <tr>
  //                 <th>Categories</th>
  //                 <td>{data.category}</td>
  //               </tr>
  //               <tr>
  //                 <th>Manufactures</th>
  //                 <td>{data.manufacturer}</td>
  //               </tr>
  //               <tr>
  //                 <th>Unit Measures</th>
  //                 <td>{data.unitOfMeasure || "NA"}</td>
  //               </tr>
  //               <tr>
  //                 <th>Unit Price</th>
  //                 <td>{data.unitPrice}</td>
  //               </tr>
  //               <tr>
  //                 <th>InitialQuantity</th>
  //                 <td>{data.initialQuantity}</td>
  //               </tr>
  //               <tr>
  //                 <th>Re-Order Level</th>
  //                 <td>{data.reorderLevel}</td>
  //               </tr>
  //               <tr>
  //                 <th>supplies</th>
  //                 <td>{data.suppliers}</td>
  //               </tr>
  //               <tr>
  //                 <th>ExpireDate</th>
  //                 <td>{data.expirationDate || "NA"}</td>
  //               </tr>
  //               <tr>
  //                 <th>Uploadimage </th>
  //                 <td>
  //                   {" "}
  //                   {imagePreview ? "" : "Not Uploaded"}
  //                   <a
  //                     href={imagePreview}
  //                     target="_blank"
  //                     style={{ width: "100%" }}
  //                   >
  //                     <img
  //                       src={imagePreview || "NA"}
  //                       style={{
  //                         maxWidth: "30%",
  //                         padding: "5px",
  //                         maxHeight: "50px",
  //                       }}
  //                     />
  //                   </a>
  //                 </td>
  //               </tr>
  //             </thead>
  //           </table> */}
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="warning" onClick={handleClose}>
  //             Back
  //           </Button>
  //           <Button className="btn submit-btn"  >
  //             Submit
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     </>
  //   );
  const handleClose = () => setviewshow(false);

  return (
    <>
      <Modal
        show={viewshow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="submit-btn ">
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row w-100 ">
            <div className="col-4 viewDetails  ">
              <b>ID:</b>
              <span>{data.id}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>#SKU:</b>
              <span>{data.sku}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Item Name:</b>
              <span>{data.itemname}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Category:</b>
              <span>{data.category}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Description:</b>
              <span>{data.description}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Manufactures:</b>
              <span>{data.manufacturer}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Unit of Measures:</b>
              <span>{data.unitOfMeasure}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Unit Price :</b>
              <span>{data.unitPrice}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>initial Quantity:</b>
              <span>{data.initialQuantity}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Re-Order Level:</b>
              <span>{data.reorderLevel}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>suppliers:</b>
              <span>{data.suppliers}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Expiration Date:</b>
              <span>{data.expirationDate}</span>
            </div>
            <div className="col-4 viewDetails">
              <b>Uploaded :</b>
              {data.imageUpload ? "" : "Not Uploaded"}
              <a
                href={data.imageUpload}
                target="_blank"
                style={{ width: "100%" }}
              >
                <img
                  src={data.imageUpload || "NA"}
                  style={{
                    maxWidth: "30%",
                    padding: "5px",
                    maxHeight: "50px",
                  }}
                />
              </a>
            </div>
          </div>
          {/* <table className="table w-100  table-responsive table-striped table-bordered">
            <thead>
              <tr>
                <th className="w-50">#SKU</th>
                <td>{data.sku}</td>
              </tr>
              <tr>
                <th className="w-50">ItemName</th>
                <td>{data.itemname}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{data.description || "NA"}</td>
              </tr>
              <tr>
                <th>Categories</th>
                <td>{data.category}</td>
              </tr>
              <tr>
                <th>Manufactures</th>
                <td>{data.manufacturer}</td>
              </tr>
              <tr>
                <th>Unit Measures</th>
                <td>{data.unitOfMeasure || "NA"}</td>
              </tr>
              <tr>
                <th>Unit Price</th>
                <td>{data.unitPrice}</td>
              </tr>
              <tr>
                <th>InitialQuantity</th>
                <td>{data.initialQuantity}</td>
              </tr>
              <tr>
                <th>Re-Order Level</th>
                <td>{data.reorderLevel}</td>
              </tr>
              <tr>
                <th>supplies</th>
                <td>{data.suppliers}</td>
              </tr>
              <tr>
                <th>ExpireDate</th>
                <td>{data.expirationDate || "NA"}</td>
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
          </table> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            <Link
              to={`/update/${data.id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Edit
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
