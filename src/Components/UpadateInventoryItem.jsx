import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert";
import { AddItemContext } from "../UseContext/UseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

function UpdateInventoryItems() {
  const getData = AddItemContext();
  const {
    formData,
    setFormData,
    handleFormSubmit,
    error,
    setError,
    existing,
    handleShow,
    cataroty,
    setImagePreview,
    imagePreview,
    getItemData,
    handleFileChange
  } = getData;
  console.log(imagePreview);
  const style = {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexWrap: "wrap",
  };
  const [unitPriceError, setUnitPriceError] = useState(false);
  const [initialQuantityError, setInitialQuantityError] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigat = useNavigate();

  // Getting Data Form Server For Edit Using ID
  useEffect(() => {
    axios
      .get("http://localhost:4800/ItemData/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Handle Handle Update
  function handleSubmit(event) {
    event.preventDefault();
    axios.put("http://localhost:4800/ItemData/" + id, data).then((res) => {
      //  Swal("Product Created Successfully")
      Swal({
        title: "Success!",
        text: "Item Updated to inventory successfully...!",
        icon: "success",
      });
      getItemData();
      navigat("/data");
    });
  }

  // For Image Upload
  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, imageUpload: e.target.files[0].name });
  //   setImagePreview(URL.createObjectURL(e.target.files[0]));
  //   console.log(imagePreview);
  // };
  // render
  return (
    <div className="d-flex w-100 justify-content-center align-items-center">
      <form className="col-4 w-75" onSubmit={handleSubmit}>
        <h1 className="text-center addItemTitle font-bold">ADD ITEM</h1>
        <div className="inputFields" style={style}>
          <div className="p-2 col-lg-6 col-md-6 col-sm-12">
            <label htmlFor="itemname" className="form-label">
              Item Name <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="itemname"
              name="itemname"
              value={data.itemname}
              onChange={(e) =>
                setData({
                  ...data,
                  itemname: e.target.value.toLowerCase(),
                })
              }
              required
              maxLength={"100"}
            />
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
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
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
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              required
            >
              {error ? (
                <option value="">Error fetching categories</option>
              ) : (
                <option value="" disabled>
                  Select...
                </option>
              )}

              {cataroty.map((eachCategory) => (
                <option key={eachCategory.id} value={eachCategory.catagory}>
                  {eachCategory.catagory}
                </option>
              ))}
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
              value={data.manufacturer}
              onChange={(e) =>
                setData({
                  ...data,
                  manufacturer: e.target.value.toLowerCase(),
                })
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
              value={data.unitOfMeasure}
              onChange={(e) =>
                setData({ ...data, unitOfMeasure: e.target.value })
              }
              required
            >
              <option value="">Select...</option>
              <option value="box">Box</option>
              <option value="strips">Strips</option>
              <option value="mg">Mg</option>
              <option value="bottle">Bottle</option>
              <option value="Bandle">Bandle</option>
              <option value="Bag">Bag</option>
              <option value="Carton">Carton</option>
              <option value="Jar">Jar</option>
              <option value="Kit">Kit</option>
              <option value="Pack">Pack</option>
              <option value="Pallet">Pallet</option>
              <option value="Roll">Roll</option>
              <option value="Tube">Tube</option>
              <option value="Each">Each</option>
              <option value="Grams">Grams</option>
              <option value="Gallon">Gallon</option>
              <option value="Ml">Ml</option>
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
              min="0"
              value={data.unitPrice}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) {
                  // Check if the input is a valid number
                  setData({
                    ...data,
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
              min="0"
              value={data.initialQuantity}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue)) {
                  // Check if the input is a valid number
                  setData({
                    ...data,
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
              value={data.expirationDate}
              onChange={(e) =>
                setData({ ...data, expirationDate: e.target.value })
              }
            />
          </div>

          {/* Image Upload */}

          <label htmlFor="imageUpload" className="form-label ms-2">
            Upload Image (jpg, png, jpeg)
          </label>
          <div className="mb-3 p-2 col-lg-12 col-md-12 col-sm-12 ">
            <label htmlFor="imageUpload" className="form-label imageUpload">
              {data.imageUpload ? data.imageUpload : "Choose file...."}
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
            {data.imageUpload && (
              <div className="mb-3 p-2 col-lg-12 col-md-12 col-sm-12">
                <label className="form-label mx-3">Uploaded Image</label>
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  style={{ maxWidth: "10%", height: "50px" }}
                />
              </div>
            )}
          </div>
        </div>
        {/* Preview Button */}
        <div className="submit_btn d-flex justify-content-end" style={style}>
          <Button variant="primary" type="submit" className="submit-btn">
            UPDATE
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateInventoryItems;
