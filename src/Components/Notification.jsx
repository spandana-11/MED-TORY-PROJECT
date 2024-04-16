import React, { useState } from "react";
import { AddItemContext } from "../UseContext/UseContext";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
const Notification = () => {
  const [show, setShow] = useState(true);

  const { reorderData, setNotificationShow, notificationShow } =
    AddItemContext();

  console.log(reorderData);
  return (
    <div className="notification p-2">
      {notificationShow ? (
        reorderData.map((item) => {
          {
            /* <Alert show={show} variant="success">
                <Alert.Heading>Re-Order Alert</Alert.Heading>
                 <p>Item Name : {item.itemname}</p>
                 <p>Item category :   {item.category}</p>
                 <p style={{ color: "red" }}>
                  Please Reoreder The {item.itemname} this is each the reorde
                  level
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setShow(false)}
                    variant="outline-success"
                  >
                    Close me
                  </Button>
                </div>
              </Alert> */
          }

          if (show) {
            return (
              <Alert
              style={{height:"100px"}}
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading style={{fontSize:"12px"}}>Re-order Alert</Alert.Heading>
                
                  
                  <p style={{ fontSize:"10px"}}>
                    Please Reoreder The <span style={{ color: "red" ,fontSize:"12px"}}>{item.itemname}</span> this is each the reorde
                    level
                  </p>
                    <button className="btn btn-primary mr-auto">View</button>
                    <button className="btn btn-primary mr-auto" >Close</button>
               
              </Alert>
            );
          }
        })
      ) : (
        <h5 className="text-center mt-2">No Notifications</h5>
      )}
    </div>
  );
};

export default Notification;
