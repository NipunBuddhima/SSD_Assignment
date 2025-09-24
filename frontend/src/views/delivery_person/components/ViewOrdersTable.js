import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  ButtonGroup,
} from "reactstrap";

import React, { useState, useEffect } from "react";
import UserController from "../controllers/user.controller.js";
import useCookie from "../../../hooks/useCookies.js";
import { useNavigate } from "react-router-dom";


const ViewOrderTable = () => {

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [getCookie] = useCookie();

  // fetch orders by transport agent nic async function
  const fetchOrders = async () => {
    let response = await UserController.getOrdersByDeliveryPersonNic(getCookie("user-nic"));

    // filter response data orderStatus = "Registered" and "Received" only
    response = response.filter((order) => order.status === "Assigned" || order.status === "Handed to Deliver");

    setTableData(response);
  };

  // update order status by order id async function
  const updateOrderStatusHanded = async (orderId) => {
    const response = await UserController.updateOrderStatus(orderId, "Handed");
    fetchOrders();
  };

  // update order status by order id async function
  const updateOrderStatusComplete = async (orderId) => {
    const response = await UserController.updateOrderStatus(orderId, "Delivered");
    fetchOrders();
  };


  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Orders Details</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of delivery orders
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th style={{ "color": "green" }}>Receiver Name</th>
                <th style={{ "color": "green" }}>Address</th>
                <th >Order Status</th>
                <th className="d-flex justify-content-center">Action</th>
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
                  <td>{formatDate(tdata.registeredDate)}</td>
                  <td>{tdata.receiverName}</td>
                  <td>{tdata.receiverAddress}</td>
                  <td>
                    <div>
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
                          Dropped Off
                        </span>
                      ) : tdata.status === "Registered" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                          Registered
                        </span>
                      ) : tdata.status === "Handed to Deliver" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-warning text-white d-inline-block">
                          Handed
                        </span>
                      ) : tdata.status === "Returned" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                          Returned
                        </span>
                      ) : tdata.status === "Assigned" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                          To Deliver
                        </span>
                      ) : (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-black text-white d-inline-block">
                          No Status
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="d-flex justify-content-center">

                  <Button className="btn me-2" color="primary" size="sm"
                          onClick={() => navigate(`/delivery-person/view-order-details/${tdata.orderId}`) }
                  >View</Button>

                    {
                      tdata.status === "Assigned" ? (

                        <Button className="btn me-2" color="primary" size="sm"
                          onClick={
                            () => { updateOrderStatusHanded(tdata.orderId) }
                          }>Picked Up</Button>

                      ) : tdata.status === "Handed to Deliver" ? (

                        <Button className="btn me-2" color="success" size="sm"
                          onClick={
                            () => { updateOrderStatusComplete(tdata.orderId) }
                          }>Complete</Button>
                      ) : (
                        <Button className="btn me-2" color="success" size="sm" disabled>Done</Button>
                      )}
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