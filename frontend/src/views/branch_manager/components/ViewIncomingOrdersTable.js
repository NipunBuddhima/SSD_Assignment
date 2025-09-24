import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Alert, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label } from "reactstrap";
import { useState, useEffect } from "react";
import useCookie from "../../../hooks/useCookies.js";
import UserController from "../controllers/user.controller.js";


const ViewIncomingOrdersTable = () => {

  // crete useCookies to get branch-id
  let [getCookie, setCookie] = useCookie();
  const [tableData, setTableData] = useState([]);

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

  // Fetch all incoming orders by branch id write with await

  const fetchData = async () => {
    try {
      // fetch data from API
      let branchId = getCookie("user-branch-id");
      const response = await UserController.getAllIncomingOrdersByBranchId(branchId);
      const data = response.data;
      console.log("data", data);

      // Convert data.registeredDate to a yyyy-mm-dd format with getFullYear(), getMonth() and getDate() methods
      data.forEach((order) => {
        order.registeredDate = new Date(order.registeredDate).getFullYear() + "-" + new Date(order.registeredDate).getMonth() + "-" + new Date(order.registeredDate).getDate();
      });

      setTableData(data);

    } catch (error) {
      console.error(error);
    }
  };

  // Update order status to received
  const updateOrderStatus = async () => {
    try {



      const response = await UserController.updateOrderStatus(selectedOrder.orderId, "Received");

      if (response.error) {
        fetchData();
        setShowErrorDialog(true);
      } else {
        fetchData();
        setShowErrorDialog(false);
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
  }
  , []);


  return (
    <div>
      <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Order: {selectedOrder.orderId} Marked As Received Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Incoming Orders</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            All incoming orders
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Sending Branch</th>
                <th className="text-center">Order Status</th>
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
                  <td>{tdata.registeredDate}</td>
                  <td>{tdata.sendingBranch}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {tdata.status === "Delivered" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-success text-white d-inline-block">
                          Delivered
                        </span>
                      ) : tdata.status === "On Route" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-warning text-white d-inline-block">
                          On Route
                        </span>
                      ) : tdata.status === "Received" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-info text-white d-inline-block">
                          Received
                        </span>
                      ) : tdata.status === "Registered" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                          Registered
                        </span>
                      ) : tdata.status === "Handed to Delivery" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-success text-white d-inline-block">
                          Handed
                        </span>
                      ) : tdata.status === "Returned" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                          Returned
                        </span>
                      ) :(
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-black text-white d-inline-block">
                          No Status
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="d-flex justify-content-center">
                    {/* <Button  className="btn me-2" outline color="secondary" size="sm">Edit</Button> */}
                    <Button  className="btn me-2" color="primary" size="sm">View</Button>
                    <Button  className="btn" color="success" size="sm"
                    onClick={() => {
                      setShowErrorDialog(false);
                      setShowSuccessDialog(false);
                      setSelectedOrder(tdata);
                      toggleEditModal();
                    }}
                    >Received</Button>
                  </td>          
                </tr>
              ))}
            </tbody>
            
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Order</ModalHeader>
        <ModalBody>
          <p>Are your sure you want to mark this orderId: {selectedOrder.orderId} as received?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditModal}>
            Close
          </Button>
          <Button color="primary" onClick={() => {
            updateOrderStatus();
            toggleEditModal();
            }}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewIncomingOrdersTable;
