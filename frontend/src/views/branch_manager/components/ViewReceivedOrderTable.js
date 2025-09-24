import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Alert, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label } from "reactstrap";
import { useState, useEffect } from "react";
import Select from "react-select";
import useCookie from "../../../hooks/useCookies.js";
import UserController from "../controllers/user.controller.js";


const ViewReceivedOrderTable = () => {

  // crete useCookies to get branch-id
  let [getCookie] = useCookie();
  const [tableData, setTableData] = useState([]);
  let [deliveryPersonsNic, setDeliveryPersonsNic] = useState([]);
  let [selectedDeliveryPersonNic, setSelectedDeliveryPersonNic] = useState(null);

  // create useState to store selected order
  let [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  // Toggle edit modal function
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  // Alert
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const hideSuccessDialog = () => setShowSuccessDialog(false);

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const hideErrorDialog = () => setShowErrorDialog(false);

  // Alert Undo
  const [showUndoSuccessDialog, setShowUndoSuccessDialog] = useState(false);
  const hideUndoSuccessDialog = () => setShowUndoSuccessDialog(false);

  const [showUndoErrorDialog, setShowUndoErrorDialog] = useState(false);
  const hideUndoErrorDialog = () => setShowUndoErrorDialog(false);

  // create async function to fetch data from API
  const fetchData = async () => {
    try {
      // fetch data from API
      let branchId = getCookie("user-branch-id");
      const response = await fetch(`http://localhost:5000/api/receivedOrders/${branchId}`);
      const data = await response.json();

      // Convert data.registeredDate to a yyyy-mm-dd format with getFullYear(), getMonth() and getDate() methods
      data.forEach((order) => {
        order.registeredDate = new Date(order.registeredDate).getFullYear() + "-" + new Date(order.registeredDate).getMonth() + "-" + new Date(order.registeredDate).getDate();
      });

      setTableData(data);

    } catch (error) {
      console.error(error);
    }
  }

  // create function to handle delivery person change
  const handleDeliveryPersonChange = (e) => {
    setSelectedDeliveryPersonNic(e);
  };

  // create function to assign delivery person
  const assignDeliveryPerson = async () => {
    try {
      // fetch data from API
      console.log(selectedOrder.orderId);
      console.log(selectedDeliveryPersonNic.value);
      const response = await fetch(`http://localhost:5000/api/assign-delivery-person/${selectedOrder.orderId}/${selectedDeliveryPersonNic.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      
      const data = await response.json();

      if (data.error) {
        setShowErrorDialog(true);
      } else {
        setShowErrorDialog(false);
        setShowSuccessDialog(true);
        fetchData();
      }

    } catch (error) {
      console.error(error);
    }
  };

  // Update order status to received
  const updateOrderStatus = async (orderId) => {
    try {
      const response = await UserController.updateOrderStatus(orderId, "Registered");

      if (response.error) {
        fetchData();
        setShowUndoErrorDialog(true);
      } else {
        fetchData();
        setShowUndoErrorDialog(false);
        setShowUndoSuccessDialog(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  // Common use state
  useEffect(() => {
    
    // create a async function to fetch delivery persons nic with branch id call controller
    const fetchDeliveryPersonsNic = async () => {
      try {
        // fetch data from API
        let branchId = getCookie("user-branch-id");
        const response = await fetch(`http://localhost:5000/api/get-all-delivery-persons-nics/${branchId}`);
        const data = await response.json();

        // Convert data.registeredDate to a yyyy-mm-dd format with getFullYear(), getMonth() and getDate() methods
        data.forEach((deliveryPerson) => {
          deliveryPerson.label = deliveryPerson.nic;
          deliveryPerson.value = deliveryPerson.nic;
        });

        setDeliveryPersonsNic(data);

      } catch (error) {
        console.error(error);
      }
    }


    // call the async function to fetch data
    fetchDeliveryPersonsNic();
    fetchData();

    console.log(deliveryPersonsNic);
  }, []);



  return (
    <div>
      <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Delivery Person Assigned Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>

      <Alert color="success" isOpen={showUndoSuccessDialog} toggle={hideUndoSuccessDialog}> Undo As An Incoming Order Successfully!</Alert>
      <Alert color="danger" isOpen={showUndoErrorDialog} toggle={hideUndoErrorDialog}> Undo Something Went Wrong! </Alert>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Received Orders</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            All received orders
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Receiver</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.orderId}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.receiverName}</td>
                  <td>{tdata.receiverAddress}</td>
                  <td>{tdata.receiverContactNumber}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {tdata.status === "Assigned" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-success text-white d-inline-block">
                          Assigned
                        </span>
                      ) :(
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                          Not Assigned
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="d-flex justify-content-center">
                    {/* <Button  className="btn me-2" outline color="secondary" size="sm">Edit</Button> */}
                    <Button  className="btn me-2" color="primary" size="sm" onClick={() => {
                      updateOrderStatus(tdata.orderId);
                    }}>Undo</Button>
                    <Button  className="btn" color="success" size="sm"
                    onClick={() => {
                      setSelectedOrder(tdata);
                      toggleEditModal();
                    }}
                    >Assign</Button>
                  </td>          
                </tr>
              ))}
            </tbody>
            
          </Table>
        </CardBody>
      </Card>

      {/* Assign Modal */}
      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Assign Delivery Person</ModalHeader>
        <ModalBody>
          <Form>
          {/* <legend className="mt-2">Delivery Person</legend> */}
              <FormGroup>
                <Label for="sender">Select Delivery Person NIC</Label>
                <Select
                  id="sender"
                  name="sender"
                  value={selectedDeliveryPersonNic}
                  onChange={handleDeliveryPersonChange}
                  options={deliveryPersonsNic}
                  required = {true}
                />
              </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            assignDeliveryPerson();
            toggleEditModal();
            }}>Save</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default ViewReceivedOrderTable;
