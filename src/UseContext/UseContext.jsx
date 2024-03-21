import { createContext, useContext, useState, useEffect } from "react"; // Importing necessary modules from React
import axios from "axios"; // Importing Axios for making HTTP requests
import Swal from "sweetalert"; // Importing SweetAlert library for displaying alerts

// Create a new context named UserContext
export const UserContext = createContext();

// Define UserProvider functional component to provide context to its children
export const UserProvider = ({ children }) => {
  // Define state variables using useState hook
  const [existing, setExisting] = useState([]);   
  const [columns, setColumns] = useState([]);    
  const [error, setError] = useState(false);   
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    // State for storing form data
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

  // useEffect hook to fetch existing items from the API endpoint
  useEffect(() => {
    axios // Axios GET request to fetch existing items
      .get("http://localhost:4800/ItemData")
      .then((response) => {
        // Success callback
        // Set existing items and column names
        setExisting(response.data);
        setColumns(Object.keys(response.data[0]));
      })
      .catch((error) => {
        // Error callback
        console.error("Error fetching existing items:", error);
        setError(true); // Set error state to true
      });
  }, []); // Empty dependency array to run effect only once on mount
  console.log(existing);
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if any existing item matches the form data
    const isDuplicate = existing.some((item) => {
      return (
        item.itemname === formData.itemname &&
        item.manufacturer === formData.manufacturer
      );
    });
    console.log(isDuplicate);
    if (isDuplicate) {
      // If item is a duplicate, display an error alert
      Swal({
        title: "Duplicate Item",
        text: "Item already exists in the record",
        icon: "error",
      });
    } else {
      // If item is not a duplicate, add the new item
      axios // Axios POST request to add the new item
        .post("http://localhost:4800/ItemData", formData)
        .then((res) => {
          // Success callback
          Swal({
            // Display success alert
            title: "Success!",
            text: "Item added to inventory successfully",
            icon: "success",
          });
          setShow(false)
          // Reset the form data
          setFormData({
            itemname: "",
            description: "",
            category: "",
            manufacturer: "",
            unitOfMeasure: "",
            unitPrice: "",
            initialQuantity: "",
            expirationDate: "",
            imageUpload: null, // Reset imageUpload to null
          });

          // Reset the input field value for file upload
          const fileInput = document.getElementById("imageUpload");
          if (fileInput) {
            fileInput.value = ""; // Reset the file input value
          }
        })
        .catch((err) => {
          // Error callback
          Swal({
            // Display error alert
            title: "Error",
            text: "Error adding item to inventory",
            icon: "error",
          });
          console.error("Error adding item to inventory:", err);
        });
    }
  }
console.log(formData);
console.log(existing);
  // Return the context provider with context values and children components
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
        show
      }}
    >
      {children} {/* Render children components */}
    </UserContext.Provider>
  );
};

// Define AddItemContext functional component to access context values
export const AddItemContext = () => {
  return useContext(UserContext); // Return useContext hook with UserContext
};
