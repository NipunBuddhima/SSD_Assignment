import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";

import React, { useState, useEffect } from "react";
import useCookie from "../../../hooks/useCookies.js";
import UserController from "../controllers/user.controller.js";
import { useNavigate } from "react-router-dom";

const ViewOrderTable = () => {
  let [getCookie, setCookie] = useCookie();
  let [orders, setOrders] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    async function getOrders() {
      let userNic = getCookie("user-nic");
      let data = await UserController.getAllAvailableOrdersByUserNic(userNic);
      
      // formate all dates with formatDate function
      // data.forEach((order) => {
      //   order.registeredDate = formatDate(order.registeredDate);
      //   order.paymentDate = formatDate(order.paymentDate);
      //   order.deliveryDate = formatDate(order.deliveryDate);
      //   order.receivedDate = formatDate(order.receivedDate);
      // });

      setOrders(data);

    }

    getOrders();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  return (
    <div>
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
                <th>Receiver</th>
                <th>Address</th>
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
                        <h6 className="mb-0">{tdata.orderId}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{formatDate(tdata.registeredDate)}</td>
                  <td>{tdata.receiverName}</td>
                  <td>{tdata.receiverAddress}</td>
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
                    <Button className="btn me-2" color="primary" size="sm"
                    onClick={() => {navigator(`/client/view-order-details/${tdata.orderId}`)}}>
                      View
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