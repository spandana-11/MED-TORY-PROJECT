import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./addItem.css";
import Header from "./Header";

import { AddItemContext } from "../UseContext/UseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Multiselect from "multiselect-react-dropdown";
function AddItem() {
  const getData = AddItemContext();
  const {
    formData,
    setFormData,
    error,
    handleShow,
    cataroty,
    imagePreview,
    isError,
    Loading,
    suppliers,
    setSuppRes,
    multiSelectRef,
    handleFileChange,
    unitMeasure,
  } = getData;
  const style1 = {
    color: "red",
  };
  const [unitPriceError, setUnitPriceError] = useState(false);
  const [initialQuantityError, setInitialQuantityError] = useState(false);
  const [reorderError, setreorderError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const [reorderCheck, setReorderCheck] = useState(false);

  const style = {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexWrap: "wrap",
  };
  console.log(formData);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, suppliers: value });
  };

  // useEffect to check form validity whenever formData changes
  useEffect(() => {
    // Check if all required fields are filled
    const isValid =
      formData.itemname &&
      formData.category &&
      formData.manufacturer &&
      formData.unitOfMeasure &&
      formData.unitPrice &&
      formData.initialQuantity &&
      formData.reorderLevel &&
      formData.suppliers;
    setIsFormValid(isValid); // Update form validity state
  }, [formData]);
  console.log(cataroty);
  return (
    <>
      <Header />
      <div className="d-flex w-100 justify-content-center align-items-center">
        <form className="col-4 w-75">
          <h1 className="text-center addItemTitle font-bold">ADD ITEM</h1>
          <div className="  d-flex justify-content-center align-items-center">
            <h6 className=" text-center   bg-info-subtle  ">
              "Note: Fields marked with an asterisk (
              <span className="text-danger">* </span>) are required.
            </h6>
          </div>
          <div className="inputFields" style={style}>
            <div className=" field p-2 col-lg-6 col-md-6 col-sm-12">
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
                  setFormData({
                    ...formData,
                    itemname: e.target.value.toLowerCase(),
                  })
                }
                required
                maxLength={"100"}
              />
              {formData.itemname.length > 99 && (
                <span className="text-danger">
                  Max Length is 100 Characters
                </span>
              )}
            </div>

            {/* Description */}
            <div className="field p-2 col-lg-6 col-md-6 col-sm-12">
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
                <span className="text-danger">
                  Max Length is 500 Characters
                </span>
              )}
            </div>

            {/* Category */}
            <div className="field p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="category" className="form-label">
                category <span>*</span>
              </label>

              <select
                name="category"
                // id="category"
                className="form-control"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                {error ? (
                  <option value="" className="text-danger ">
                    Error fetching categories
                  </option>
                ) : (
                  <option value="" disabled>
                    Select...
                  </option>
                )}

                {cataroty.map((eachCategory) => (
                  <option
                    key={eachCategory.id}
                    value={eachCategory.catagory}
                    id="category"
                  >
                    {eachCategory.catagory}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturer */}
            <div className="field p-2 col-lg-6 col-md-6 col-sm-12">
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
                  setFormData({
                    ...formData,
                    manufacturer: e.target.value.toLowerCase(),
                  })
                }
                required
                maxLength={"100"}
              />
              {formData.manufacturer.length > 99 && (
                <span className="text-danger">
                  Max Length is 100 Characters
                </span>
              )}
            </div>

            {/* Unit of Measure */}
            <div className="field p-2 col-lg-6 col-md-6 col-sm-12">
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
                {error ? (
                  <option value="" className="text-danger">
                    Error fetching unitOfMeasure
                  </option>
                ) : (
                  <option value="" disabled>
                    Select...
                  </option>
                )}

                {unitMeasure.map((eachMesure) => (
                  <option key={eachMesure.id} value={eachMesure.catagory}>
                    {eachMesure.mesure}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Price */}
            <div className=" field p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="unitPrice" className="form-label">
                Unit Price <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="unitPrice"
                name="unitPrice"
                min="0"
                placeholder="0"
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
              {unitPriceError && (
                <span className="text-danger">Please enter numeric value.</span>
              )}
            </div>

            {/* Initial Quantity */}
            <div className="field p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="initialQuantity" className="form-label">
                Initial Quantity <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="initialQuantity"
                name="initialQuantity"
                min="0"
                placeholder="0"
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
              {initialQuantityError && (
                <span className="text-danger">Please enter numeric value.</span>
              )}
            </div>

            {/* Expiration Date */}
            <div className="field p-2 col-lg-6 col-md-6 col-sm-12">
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

            {/* Reorder Level */}
            <div className="field p-2 col-lg-6 col-md-6 col-sm-12  ">
              <label htmlFor="reorderLevel" className="form-label">
                Reorder Level <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="reorderLevel"
                name="reorderLevel"
                min="0"
                placeholder="0"
                value={formData.reorderLevel}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!isNaN(inputValue)) {
                    // Check if the input is a valid number
                    setFormData({
                      ...formData,
                      reorderLevel: Number(inputValue),
                    });
                    if (inputValue >= formData.initialQuantity) {
                      setReorderCheck(true);
                      setFormData({
                        ...formData,
                        reorderLevel: null,
                      });
                    } else {
                      setReorderCheck(false);
                    }
                    setreorderError(false); // Reset error state
                  } else {
                    // If the input is not a valid number, show an error
                    setreorderError(true);
                  }
                }}
                required
              />
              {reorderError && (
                <span className="text-danger">Please enter numeric value.</span>
              )}
              {reorderCheck && (
                <small className="text-danger">
                  Re-Order Level Must be Lessthen Initial Quantity
                </small>
              )}
            </div>
            {/* multi selection  */}

            <div
              className="field p-2 col-lg-6 col-md-6 col-sm-12  "
              style={{ height: "20px" }}
            >
              <label htmlFor="Suppliers" className="  Suppliers mb-2">
                Suppliers <span style={style1}>*</span>
              </label>
              <div className="from-control">
                <Multiselect
                  ref={multiSelectRef}
                  id="suppliers"
                  value={formData.suppliers}
                  options={suppliers.map((eachsupp) => {
                    return eachsupp.supplierName;
                  })}
                  isObject={false}
                  onSelect={(event) => setSuppRes(event)}
                  onRemove={(event) => setSuppRes(event)}
                  onChange={handleInputChange}
                  placeholder="Select...."
                />
                {Loading ? (
                  <p>Loading....</p>
                ) : error ? (
                  <span style={{ color: "red" }}>Something went wrong....</span>
                ) : null}
              </div>
            </div>

            {/* Image Upload */}

            <div className="mb-3 p-2 col-lg-12 col-md-12 col-sm-12 ">
              <label htmlFor="imageUpload" className="form-label ms-2">
                Upload Image (jpg, png, jpeg)
              </label>
              <label htmlFor="imageUpload" className="form-label imageUpload">
                {imagePreview ? imagePreview : "Choose file...."}
                <input
                  type="file"
                  className="form-control"
                  id="imageUpload"
                  name="imageUpload"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                />
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  className="faCloudArrowUp"
                />
              </label>
              {formData.imageUpload && (
                <div className="mb-3 p-2 col-lg-12 col-md-12 col-sm-12">
                  <label className="form-label mx-3">Uploaded Image</label>
                  <img
                    src={formData.imageUpload}
                    alt="Uploaded"
                    style={{ maxWidth: "10%", height: "50px" }}
                  />
                </div>
              )}
              <div
                className="submit_btn d-flex justify-content-end"
                style={style}
              >
                <Button
                  variant="primary"
                  onClick={handleShow}
                  disabled={!isFormValid}
                  className="submit-btn"
                >
                  PREVIEW
                </Button>
              </div>
            </div>
          </div>
          {/* Preview Button */}
        </form>
      </div>
    </>
  );
}

export default AddItem;
