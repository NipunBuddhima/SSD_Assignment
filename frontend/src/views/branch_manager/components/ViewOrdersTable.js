import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Alert
} from "reactstrap";

import React, { useState, useEffect } from "react";
import useCookie from "../../../hooks/useCookies.js";
import UserController from "../controllers/user.controller.js";
import { useNavigate } from "react-router-dom";

const ViewOrderTable = () => {

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const hideSuccessDialog = () => setShowSuccessDialog(false);
  const hideErrorDialog = () => setShowErrorDialog(false);

    const navigate = useNavigate();

  let [getCookie, setCookie] = useCookie();
  let [orders, setOrders] = useState([]);

  async function getOrders() {
    let branchId = getCookie("user-branch-id");
    let data = await UserController.getAllOrdersByBranchId(branchId);
    setOrders(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  async function deleteOrder(orderId) {
    let data = await UserController.deleteOrder(orderId);
    console.log("data", data);
    if (data.message === "Order Deleted Successfully") {
      setShowSuccessDialog(true);
      setShowErrorDialog(false);
      getOrders();
    }else{
      setShowSuccessDialog(false);
      setShowErrorDialog(true);
      getOrders();
    }
  }

  return (
    <div>
    <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Order Placed Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}>Cannot Delte This Order!. Order Assigned To A Delivery Person </Alert>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Latest Orders</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of new orders
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Sender</th>
                <th>Destination Branch</th>
                <th className="text-center">Order Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.order_id}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(tdata.orderDate)}</td>
                  <td>{tdata.sender}</td>
                  <td>{tdata.destinationBranch}</td>
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
                    <Button
                      className="btn me-2"
                      outline
                      color="secondary"
                      size="sm"
                      // create on click to navigate /edit-order/:id
                      onClick={() => navigate(`/branch-manager/edit-order/${tdata.order_id}`)}
                    >
                      Edit
                    </Button>
                    <Button className="btn me-2" color="primary" size="sm"
                    onClick={() => navigate(`/branch-manager/view-order-details/${tdata.order_id}`)}>
                      View
                    </Button>
                    <Button className="btn me-2" color="danger" size="sm"
                    onClick={() => {
                      deleteOrder(tdata.order_id);
                    }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

    </div>
  );
};

export default ViewOrderTable;