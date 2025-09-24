import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,

} from "reactstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserController from "../controllers/user.controller.js";


const ViewOrders = () => {

  // create usestate for order data
  const [orderData, setOrderData] = useState({});
  // get order id from url
  const { orderId } = useParams();

  // create useeffect to get order data
  useEffect(() => {
    async function getOrderData() {
      try {
        let response = await UserController.getOrderViewDetailsByOrderId(orderId);
        
        // format date with getYear, getMonth, getDay
        response.registeredDate = new Date(response.registeredDate).getFullYear() + "-" + new Date(response.registeredDate).getMonth() + "-" + new Date(response.registeredDate).getDate();
        response.paymentDate = new Date(response.paymentDate).getFullYear() + "-" + new Date(response.paymentDate).getMonth() + "-" + new Date(response.paymentDate).getDate();
        response.deliveryDate = new Date(response.deliveryDate).getFullYear() + "-" + new Date(response.deliveryDate).getMonth() + "-" + new Date(response.deliveryDate).getDate();
        response.receivedDate = new Date(response.receivedDate).getFullYear() + "-" + new Date(response.receivedDate).getMonth() + "-" + new Date(response.receivedDate).getDate();

        setOrderData(response);
      }
      catch (error) {
        console.log(error);
      }
    }

    getOrderData();
  }, []);

  return (
    <div>
      <Row>
        <Col sm="6" lg="6">
          <Card>
            <CardBody>
              <h4 style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>Order ID: {orderData.orderId}</h4>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" lg="6">
          <Card>
            <CardBody className="d-flex justify-content-center align-items-center">
              <h4 className="d-inline me-2"> Order Status:</h4>
              <h4 className="d-inline">
                {orderData.status === "Delivered" ? (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-success text-white d-inline-block">
                    Delivered
                  </span>
                ) : orderData.status === "On Route" ? (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-warning text-white d-inline-block">
                    On Route
                  </span>
                ) : orderData.status === "Received" ? (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-info text-white d-inline-block">
                    Received
                  </span>
                ) : orderData.status === "Registered" ? (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                    Registered
                  </span>
                ) : orderData.status === "Handed to Delivery" ? (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-success text-white d-inline-block">
                    Handed
                  </span>
                ) : orderData.status === "Returned" ? (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                    Returned
                  </span>
                ) : orderData.status === "Assigned" ? (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                    Assigned
                  </span>
                ) : (
                  <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-black text-white d-inline-block">
                    No Status
                  </span>
                )}
              </h4>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="6" lg="4">
          <Card color="danger">
            <CardBody>
              <CardTitle className="mb-3" tag="h5"><i className="bi bi-person">{"  "}</i>Sender Details</CardTitle>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Sender Name</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.senderName}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Sender NIC</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.senderNic}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" lg="4">
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h5"><i className="bi bi-box">{" "}</i>Order Details</CardTitle>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Package Weight</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.weight}{"Kg"}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Package Type</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.packageType}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" lg="4">
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h5"><i className="bi bi-house">{"  "}</i>Branch Details</CardTitle>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Sending Branch</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.sendingBranch}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Receiving Branch</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.receivingBranch}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col sm="6" lg="8">
          <Card color="success">
            <CardBody>
              <CardTitle className="mb-3" tag="h5"><i className="bi bi-person">{"  "}</i>Receiver Details</CardTitle>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Receiver Name</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.senderName}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Receiver NIC</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.senderNic}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Receiver Address</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.receiverAddress}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Receiver Contact Number</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.contactNumber}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6" lg="4">
          <Card>
            <CardBody>
              <CardTitle className="mb-3" tag="h5"><i className="bi bi-calendar">{"  "}</i>Dates & Times</CardTitle>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Registered Date</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.registeredDate}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Payment Date</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.paymentDate}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Delivery Date</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.deliveryDate}</h3>
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">Received Date</small>
                  <h3 className="mb-2 font-weight-bold">{orderData.receivedDate}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewOrders;
