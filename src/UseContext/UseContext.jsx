import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import Swal from "sweetalert";
import swal from "sweetalert";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Create a context for managing user data
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  // State variables for managing various data
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview URL
  const [existing, setExisting] = useState([]); // State to store existing items
  const [columns, setColumns] = useState([]); // State to store column names
  const [cataroty, setCataroty] = useState([]); // State to store categories
  const [unitMeasure, setUnitMeasure] = useState([]); // State to store categories
  const [error, setError] = useState(false); // State for error handling
  const [show, setShow] = useState(false); // State for modal visibility
  const [loading, setloading] = useState(false); // State for loading status
  const handleClose = () => setShow(false); // Function to close modal
  const [editBtn, setEditBtn] = useState(false);
  const [isupdate, setIsUpdate] = useState(null);
  const handleShow = () => {
  
    setShow(true);
  };

  const [reorderData, setReorderData] = useState([]); // State for reorder data
  const [notificationShow, setNotificationShow] = useState(false); // State for notification visibility
  const [Loading, setLoading] = useState(false); // State for loading status
  const [isError, setIsError] = useState(false); // State for error handling
  const [suppliers, setSuppliers] = useState([]); // State for suppliers data
  const [sku, setisSku] = useState([]); // State for SKU
  const [suppres, setSuppRes] = useState([]); // State for selected suppliers
  const multiSelectRef = useRef(null); // Reference for multi-select component
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [viewshow, setviewshow] = useState(false); // State for view modal visibility

  // Function to handle view modal show
  const handleViewShow = (id) => {
    setviewshow(true);
    alert(id);
  };

  // Initial form data state
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
    reorderLevel: "",
    suppliers: "",
    sku: "",
    imageUpload: null,
  });

  // State for fetched data
  const [data, setData] = useState([]);

  // Function to handle view modal show with data fetch
  const handleViwShow = (id) => {
    setviewshow(true);
    axios
      .get("http://localhost:4800/ItemData/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  // Function to fetch existing item data
  const getItemData = () => {
    setloading(true);
    try {
      axios
        .get("http://localhost:4800/ItemData")
        .then((response) => {
          if (response.status === 404) {
            throw new Error("Data Not Found");
          }
          setExisting(response.data);
          setloading(false);
          if (response.data.length > 0) {
            setColumns(Object.keys(response.data[0]));
          } else {
            setColumns([]);
          }
        })
        .catch((error) => {
          if (error.message === "Data Not Found") {
            setError(true);
          } else {
            console.error("Error fetching existing items:", error);
            setError(true);
          }
          setloading(false);
        });
    } catch (error) {
      console.error("Error fetching existing items:", error);
      setError(true);
      setloading(false);
    }
  };

  // Effect to update form data when selected suppliers change
  useEffect(() => {
    // const selectedSuppliers = suppres ? suppres.join(", ") : "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      suppliers: [suppres],
    }));
  }, [suppres]);

  // Effect to fetch suppliers data
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4800/SuppliersData")
      .then((response) => {
        setSuppliers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suppliers", error);
        setLoading(false);
        setIsError(true);
      });
  }, []);

  // Effect to fetch category data
  useEffect(() => {
    setloading(true);
    setError(true);
    try {
      axios.get("http://localhost:4800/Catagory").then((response) => {
        if (response.status === 404) {
          console.log("Category data not found");
          // throw new Error("Category Data Not Found");
        }
        getItemData();
        setError(false);
        setCataroty(response.data);
        setloading(false);
      });
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.message === "Category Data Not Found") {
        setError(true);
      } else {
        console.error("Error fetching existing items:", error);
        setError(true);
        setloading(false);
      }
    }
  }, [formData.category]);

  // Effect to fetch Unit Msure data
  useEffect(() => {
    setloading(true);
    setError(true);
    try {
      axios.get("http://localhost:4800/unitofmesure").then((response) => {
        if (response.status === 404) {
          console.log("Category data not found");
          // throw new Error("Category Data Not Found");
        }
        getItemData();
        setError(false);
        setUnitMeasure(response.data);
        setloading(false);
      });
    } catch (error) {
      console.error("Error fetching unitofmesure data:", error);
      if (error.message === "Category Data Not Found") {
        setError(true);
      } else {
        console.error("Error fetching existing items:", error);
        setError(true);
        setloading(false);
      }
    }
  }, [formData.unitOfMeasure]);

  // Generate SKU based on item name and current date
  const newSku =
    formData.itemname.replace(/\s+/g, "-").slice(0, 4).toLowerCase() +
    "-" +
    new Date().getDate() +
    (new Date().getMonth().toLocaleString() > 10
      ? new Date().getMonth().toLocaleString()
      : "0" + new Date().getMonth().toLocaleString());

  // Form data with generated SKU
  const formDataWithSKU = { ...formData, sku: newSku.toString() };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setImagePreview(e.target.files[0].name);

    const file = new FileReader();
    file.readAsDataURL(e.target.files[0]);
    file.onload = (ei) => {
      console.log(ei.target.result);
      setFormData({
        ...formData,
        imageUpload: ei.target.result || "Not Uploaded",
      });
    };
  };

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();

    function resetFormAndModal() {
      if (multiSelectRef.current) {
        multiSelectRef.current.resetSelectedValues();
      }
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
        reorderLevel: "",
        suppliers: null,
        imageUpload: null,
      });
    }
    // Check if the item is being updated

    // Check if item is duplicate
    const isDuplicate = existing.some((item) => {
      return (
        item.itemname === formData.itemname &&
        item.manufacturer === formData.manufacturer &&
        item.id !== isupdate
      );
    });

    // Show error if item is duplicate, otherwise submit form data
    if (isDuplicate) {
      Swal({
        title: "Duplicate Item",
        text: "Item already exists in the record",
        icon: "error",
      });
      return;
    }
    if (isupdate) {
      // Update the item

      axios
        .put(`http://localhost:4800/ItemData/${isupdate}`, formDataWithSKU)
        .then((res) => {
          Swal({
            title: "Success!",
            text: "Item updated in inventory successfully",
            icon: "success",
          });
          setEditBtn(false);
          setIsUpdate("");
          handleClose(true);
          navigate("/data");
          getItemData();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            Swal({
              title: "Error",
              text: "Item not found. Please refresh and try again.",
              icon: "error",
            });
          } else {
            Swal({
              title: "Error",
              text: "Failed to update item in inventory.",
              icon: "error",
            });
          }
          console.error("Error updating item:", error);
        });
    } else {
      // Add new item to inventory
      try {
        axios
          .post("http://localhost:8080/addItem", formDataWithSKU)
          .then((res) => {
            Swal({
              title: "Success!",
              text: "Item added to inventory successfully",
              icon: "success",
            });

            // Reset form and close modal
            resetFormAndModal();
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

  // Update
  const handleEdit = (id) => {
    const EditedData = filteredData.find((item) => item.id === id);
    const isDuplicate = filteredData.some((item) => {
      return (
        item.itemname === EditedData.itemname &&
        item.manufacturer === EditedData.manufacturer &&
        item.id !== id
      );
    });
    if (isDuplicate) {
      Swal({
        title: "Duplicate Item",
        text: "Item already exists in the record",
        icon: "error",
      });
      return;
    }
    setFormData(EditedData);
    setIsUpdate(id);
    setEditBtn(true);

    alert(id);
  };

  // Function to handle item deletion
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:4800/ItemData/${id}`)
          .then((response) => {
            if (response.status === 200) {
              swal("Poof! Your item has been deleted!", {
                icon: "success",
              }).then(() => {});
              getItemData();
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

  // Provide the context value to the children components
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
        setloading,
        loading,
        error,
        setImagePreview,
        imagePreview,
        handleDelete,
        getItemData,
        setExisting,
        reorderData,
        setReorderData,
        notificationShow,
        setNotificationShow,
        isError,
        Loading,
        suppliers,
        // suppres: suppres.join(", "),
        setSuppRes,
        formDataWithSKU,
        viewshow,
        multiSelectRef,
        filteredData,
        setFilteredData,
        handleViewShow,
        data,
        setData,
        handleViwShow,
        setviewshow,
        handleFileChange,
        handleEdit,
        editBtn,
        unitMeasure,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Function to use the context
export const AddItemContext = () => {
  return useContext(UserContext);
};
