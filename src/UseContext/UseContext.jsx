import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";
import DotLoader from "react-spinners/ClipLoader";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [existing, setExisting] = useState([]);
  const [columns, setColumns] = useState([]);
  const [cataroty, setCataroty] = useState([]);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    itemname: "",
    description: "",
    category: "",
    manufacturer: "",
    unitOfMeasure: "",
    unitPrice: "",
    initialQuantity: "",
    expirationDate: "",
    imageUpload: null,
  });

  useEffect(() => {
    setLoading(true);
    try {
      axios.get("http://localhost:4800/ItemData")
        .then((response) => {
          if (response.status === 404) {
            throw new Error("Data Not Found"); // Throw an error if data is not found
          }
          setExisting(response.data);
          setLoading(false);
          if (response.data.length > 0) {
            setColumns(Object.keys(response.data[0]));
          } else {
            setColumns([]);
          }
        })
        .catch((error) => {
          if (error.message === "Data Not Found") {
            // Handle 404 error here
            // You can set a state variable to control rendering of the message
            setError(true);
          } else {
            console.error("Error fetching existing items:", error);
            setError(true);
          }
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching existing items:", error);
      setError(true);
      setLoading(false);
    }
  }, []);
  

  useEffect(() => {
    setError(true)
    try {
      axios.get("http://localhost:4800/Catagory").then((response) => {
        if (response.status === 404) {
          console.log("Category data not found");
           throw new Error("Category Data Not Found"); // Throw an error if category data is not found
        }
        setError(false); // No error occurred, so set error state to false
        setCataroty(response.data);
      });
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.message === "Category Data Not Found") {
        // Handle category data not found error here
        setError(true);
      } else {
        
        // Handle other errors
      }
    }
  }, []);
  

  function handleFormSubmit(event) {
    event.preventDefault();
    const isDuplicate = existing.some((item) => {
      return (
        item.itemname === formData.itemname &&
        item.manufacturer === formData.manufacturer
      );
    });
    if (isDuplicate) {
      Swal({
        title: "Duplicate Item",
        text: "Item already exists in the record",
        icon: "error",
      });
    } else {
      try {
        axios.post("http://localhost:4800/ItemData", formData).then((res) => {
          Swal({
            title: "Success!",
            text: "Item added to inventory successfully",
            icon: "success",
          });
          setShow(false);
          setFormData({
            itemname: "",
            description: "",
            category: "",
            manufacturer: "",
            unitOfMeasure: "",
            unitPrice: "",
            initialQuantity: "",
            expirationDate: "",
            imageUpload: null,
          });
          const fileInput = document.getElementById("imageUpload");
          if (fileInput) {
            fileInput.value = "";
          }
        });
      } catch (err) {
        Swal({
          title: "Error",
          text: "Error adding item to inventory",
          icon: "error",
        });
        console.error("Error adding item to inventory:", err);
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        formData,
        setFormData,
        handleFormSubmit,
        error,
        setError,
        existing,
        columns,
        handleClose,
        handleShow,
        show,
        cataroty,
        setLoading,
        loading,
        error
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const AddItemContext = () => {
  return useContext(UserContext);
};
