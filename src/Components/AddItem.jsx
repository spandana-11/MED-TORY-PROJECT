import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./addItem.css";
import Header from "./Header";
import InputData from "./InputData";
import { AddItemContext } from "../UseContext/UseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
function AddItem() {
  // Retrieve data from context
  const getData = AddItemContext();

  // Destructuring values from context
  const { formData, setFormData, handleFormSubmit, error, setError, existing } =
    getData;

  // State for managing errors related to unit price and initial quantity
  const [unitPriceError, setUnitPriceError] = useState(false);
  const [initialQuantityError, setInitialQuantityError] = useState(false);

  // Inline style for consistency
  const style = {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexWrap: "wrap",
  };

  // Handler for file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, imageUpload: e.target.files[0].name });
  };

  return (
    <>
      {/* Header component */}
      <Header />

      {/* Form section */}
      <div className="d-flex w-100 justify-content-center align-items-center">
        <form className="col-4 w-75" onSubmit={handleFormSubmit}>
          <h1 className="text-center addItemTitle">ADD ITEM</h1>

          {/* Input fields */}
          <div className="inputFields" style={style}>
            {/* Item Name */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="itemname" className="form-label">
                Item Name <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="itemname"
                name="itemname"
                value={formData.itemname}
                onChange={(e) =>
                  setFormData({ ...formData, itemname: e.target.value.toLowerCase()})
                }
                required
                maxLength={"100"}
              />
              {formData.itemname.length > 99 && (
                <span>Max Length is 100 Characters</span>
              )}
            </div>

            {/* Description */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                maxLength={"500"}
              />
              {formData.description.length > 499 && (
                <span>Max Length is 500 Characters</span>
              )}
            </div>

            {/* Category */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="category" className="form-label">
                category <span>*</span>
              </label>
              <select
                name="category"
                id="category"
                className="form-control"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="medical">Medical</option>
                <option value="ot">OT</option>
                <option value="icu">ICU</option>
                <option value="nicu">NICU</option>
                <option value="MedicalSupplies">Medical Supplies</option>
              </select>
            </div>

            {/* Manufacturer */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="manufacturer" className="form-label">
                Manufacturer <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturer: e.target.value.toLowerCase() })
                }
                required
                maxLength={"100"}
              />
              {formData.manufacturer.length > 99 && (
                <span>Max Length is 100 Characters</span>
              )}
            </div>

            {/* Unit of Measure */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="unitOfMeasure" className="form-label">
                Unit of Measure <span>*</span>
              </label>
              <select
                name="unitOfMeasure"
                id="unitOfMeasure"
                className="form-control"
                value={formData.unitOfMeasure}
                onChange={(e) =>
                  setFormData({ ...formData, unitOfMeasure: e.target.value })
                }
                required
              >
                <option value="">Select...</option>
                <option value="box">Box</option>
                <option value="strips">Strips</option>
                <option value="mg">Mg</option>
                <option value="bottle">Bottle</option>
              </select>
            </div>

            {/* Unit Price */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="unitPrice" className="form-label">
                Unit Price <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="unitPrice"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue)) {
                    // Check if the input is a valid number
                    setFormData({
                      ...formData,
                      unitPrice: Number(inputValue),
                    });
                    setUnitPriceError(false); // Reset error state
                  } else {
                    // If the input is not a valid number, show an error
                    setUnitPriceError(true);
                  }
                }}
                required
              />
              {unitPriceError && <span>Please enter numeric value.</span>}
            </div>

            {/* Initial Quantity */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="initialQuantity" className="form-label">
                Initial Quantity <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="initialQuantity"
                name="initialQuantity"
                value={formData.initialQuantity}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue)) {
                    // Check if the input is a valid number
                    setFormData({
                      ...formData,
                      initialQuantity: Number(inputValue),
                    });
                    setInitialQuantityError(false); // Reset error state
                  } else {
                    // If the input is not a valid number, show an error
                    setInitialQuantityError(true);
                  }
                }}
                required
              />
              {initialQuantityError && <span>Please enter numeric value.</span>}
            </div>

            {/* Expiration Date */}
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date
              </label>
              <input
                type="date"
                className="form-control"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={(e) =>
                  setFormData({ ...formData, expirationDate: e.target.value })
                }
              />
            </div>

            {/* Image Upload */}
            <label htmlFor="UploadImage" className="form-label ms-2">
              Upload Image (jpg,png,peg)
            </label>
            <div className="mb-3 p-2 col-lg-12 col-md-12 col-sm-12 ">
              <label htmlFor="imageUpload" className="form-label  imageUpload">
               Choose File....
                <input
                  type="file"
                  className="form-control"
                  id="imageUpload"
                  name="imageUpload"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                />
                <FontAwesomeIcon icon={faCloudArrowUp} className="faCloudArrowUp"/>
              </label>

              {formData.imageUpload && (
                <div className="mb-3 p-2 col-lg-12 col-md-12 col-sm-12">
                  <label className="form-label">Uploaded Image</label>
                  <img
                    src={`images/${formData.imageUpload}`}
                    alt="Not Available"
                    style={{ maxWidth: "10%", height: "50px" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit_btn d-flex justify-content-end" style={style}>
            <button type="submit" className="btn w-25 submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* InputData component */}
      {/* <InputData /> */}
    </>
  );
}

export default AddItem;
