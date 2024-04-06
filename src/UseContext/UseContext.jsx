import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";
import swal from "sweetalert";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [refresh, setRefresh] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
  const [existing, setExisting] = useState([]);
  const [columns, setColumns] = useState([]);
  const [cataroty, setCataroty] = useState([]);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Form Data Getting Input Form User to Store in the state
  const [formData, setFormData] = useState({
    id: new Date().getTime().toString(),
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
  // Getting Inventory Item Data Form server
  const getItemData = () => {
    setLoading(true);
    try {
      axios
        .get("http://localhost:4800/ItemData")
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
  };
  // Controling Rerenders
  useEffect(() => {
    getItemData();
  }, []);

  // Getting Catagory Data Form server
  useEffect(() => {
    setLoading(true);
    setError(true);
    try {
      axios.get("http://localhost:4800/Catagory").then((response) => {
        if (response.status === 404) {
          console.log("Category data not found");
          throw new Error("Category Data Not Found"); // Throw an error if category data is not found
        }
        getItemData();
        setError(false); // No error occurred, so set error state to false
        setCataroty(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.message === "Category Data Not Found") {
        // Handle category data not found error here
        setError(true);
      } else {
        console.error("Error fetching existing items:", error);
        setError(true);
        setLoading(false);
        // Handle other errors
      }
    }
  }, [formData.category]);

  // Handling Form Submition
  function handleFormSubmit(event) {
    event.preventDefault();

    // Checking Duplication
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
    }
    //Adding Inventory Item To server
    else {
      try {
        axios.post("http://localhost:4800/ItemData", formData).then((res) => {
          Swal({
            title: "Success!",
            text: "Item added to inventory successfully",
            icon: "success",
          });
          setShow(false);
          getItemData();
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
  // ======Delete Item Form Inventory
  const handleDelete = (id) => {
    // Use SweetAlert for confirmation
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Make a DELETE request to your server
        axios
          .delete(`http://localhost:4800/ItemData/${id}`)
          .then((response) => {
            if (response.status === 200) {
              swal("Poof! Your item has been deleted!", {
                icon: "success",
              }).then(() => {
                // Update the inventory in your context or state
                setExisting(existing.filter((item) => item.id !== id));
              });
            } else {
              swal("Error!", "Failed to delete item.", "error");
            }
          })
          .catch((error) => {
            swal("Error!", "Failed to delete item.", "error");
            console.error(error);
          });
      } else {
        swal("Cancelled", "Your item is safe :)", "error");
      }
    });
  };

  // Render
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
        error,
        setImagePreview,
        imagePreview,
        handleDelete,
        getItemData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// Custom Hook
export const AddItemContext = () => {
  return useContext(UserContext);
};
