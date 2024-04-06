import React, { useState } from "react";
import axios from "axios";

const UploadFileForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    imageUpload: null,
  });
console.log(formData);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imageUpload: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("itemName", formData.itemName);
      formDataWithFile.append("description", formData.description);
      formDataWithFile.append("imageUpload", formData.imageUpload);

      const response = await axios.post(
        "http://localhost:4800/upload",
        formDataWithFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
        );
        alert("form submit")
      console.log("File uploaded successfully:", response.data);
      // Reset form data after successful upload
      setFormData({
        itemName: "",
        description: "",
        imageUpload: null,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="imageUpload">Choose Image:</label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadFileForm;
