import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Alert
} from "reactstrap";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { BranchManagerRoutes } from "../../../routes/all_user.routes.js";
import useCookie from "../../../hooks/useCookies.js";
import validator from "../../../validation/validation.js";
import BranchManagerController from "../controllers/user.controller.js";


//New import for component dropdown option
import DropdownOption from "../../../components/common/DropdownOption.jsx";



const AddNewOrder = () => {

   // get orderId which are passed through /edit-order/:orderId
    const orderId = useParams().orderId;

   // Get order details which are related to orderId
   const [orderDetails, setOrderDetails] = useState({});
 
   // Create object for use navigator
   const navigate = useNavigate();
 
   //state variables to hold all clients and selected client nic
   let [clientNICs, setClientNICs] = useState([]);
   let [selectedSenderNIC, setSelectedSenderNIC] = useState("");
 
   // Create an object to use cookies
   let [getCookie, setCookie] = useCookie();
 
   // Dropdown state variables
   let [branches, setBranches] = useState([]);
   let [packageTypes, setPackageTypes] = useState([]);
   let [orderStatus, setOrderStatus] = useState([]);
 
   // Alert
   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
   const hideSuccessDialog = () => {
     setShowSuccessDialog(false);
     navigate(BranchManagerRoutes.viewOrders);
   };
 
   const [showErrorDialog, setShowErrorDialog] = useState(false);
   const hideErrorDialog = () => setShowErrorDialog(false);

    const [showErrorDeleteDialog, setShowErrorDeleteDialog] = useState(false);
    const hideErrorDeleteDialog = () => setShowErrorDeleteDialog(false);

 
   //state variable to hold courier fee
   let [courierFee, setCourierFee] = useState(0.0);
 
 
   // Map variable
   const [userInput, setInputData] = useState({
     weight: "",
     sendingDate: "",
     paymentDate: "",
     packageTypes: 1,
     sendingBranch: "",
     receivingBranch: "",
     specialNotes: "",
     orderStatus: 1,
     sender: "",
     receiver: "",
     contactNumber: "",
     address: "",
   });
 
   // Validation regex
   let {
     validateNIC,
     validateEmail,
     validateName,
     validateAddress,
     validatePhoneNumber,
   } = validator();
 
   const [validations, setValidations] = useState({
     weight: false,
     receiver: false,
     contactNumber: false,
   });
 
   // onChange Form validation
   const validateField = (name, value) => {
     switch (name) {
       case "weight":
         return value > 0 && value < 9999999;
       case "receiver":
         return validateName(value);
       case "contactNumber":
         return validatePhoneNumber(value);
       default:
         return true;
     }
   };
 
   const isFormValid = () => {
     for (const key in validations) {
       if (validations[key]) {
         return false;
       }
     }
     return true;
   };
 
   // onChange
   const onChange = (e) => {
     console.log(e.target.value);
     const { name, value } = e.target;
     setInputData((preval) => {
       return {
         ...preval,
         [name]: value,
       };
     });
     // onChange Form validation data set on change
     setValidations({
       ...validations,
       [name]: !validateField(name, value), // Not sign for conver false to true
     });
   };
 
   // code which handles the sender nic change
   const handleSenderChange = (e) => {
     setSelectedSenderNIC(e);
     setInputData((prevOptions) => {
       return {
         ...prevOptions,
         sender: e.value,
       };
     });
   };

   // fetch order details and save in the orderDetails usestate
    async function fetchOrderDetails() {
      let response = await BranchManagerController.getOrderDetailsByOrderId(orderId);
      if (response.error) {
        alert(response.error);
      } else {
        response = response.data[0];
        setOrderDetails(response);
      }
    }
        
 
   // Fetch dropdown data [RUN ONE TIME WHEN PAGE LOADING]
   useEffect(() => {
    
     //Fetch branches to fill dropdown
     async function fetchAllBranches() {
       let response = await BranchManagerController.getAllBranches();
       if (response.error) {
         alert(response.error);
       } else {
         setBranches(response.data);
       }
     }
 
     //Fetch all packages types to fill dropdown
     async function fetchAllPackageTypes() {
       let response = await BranchManagerController.getAllPackageTypes();
       if (response.error) {
         alert(response.error);
       } else {
         setPackageTypes(response.data);
       }
     }
 
     //Fetch all  order satatus to fill dropdown
     async function fetchAllOrderStatus() {
       let response = await BranchManagerController.getAllOrderStatus();
       if (response.error) {
         alert(response.error);
       } else {
         setOrderStatus(response.data);
       }
     }
 
     async function fetchAllClientNICs() {
       let response = await BranchManagerController.getAllClientNICs();
       if (response.error) {
         alert(response.error);
       } else {
         setClientNICs(response.data);
       }
     }
 
     // get user branch with cookies
     let branchId = getCookie("user-branch-id");
 
     // Save previous data and save new data
     setInputData((prev) => {
       return { ...prev, sendingBranch: branchId, receivingBranch: branchId };
     });
 
     
     fetchAllBranches();
     fetchAllPackageTypes();
     fetchAllOrderStatus();
     fetchAllClientNICs();
     fetchOrderDetails();
     
   }, []);
 
 
   //Hook which reacts to weight/type change and changes price
   useEffect(() => {
     async function getFee() {
       var regex = /^\d+(\.\d+)?$/;
       let valid = regex.test(userInput.weight);
       if (!valid) {
         setCourierFee(0.0);
       } else {
         let { fee } = await BranchManagerController.getCourierFee(
           userInput.weight,
           userInput.packageTypes
         );
         setCourierFee(fee);
       }
     }
 
     getFee();
   }, [userInput.weight, userInput.packageTypes]);
 
   //data submitter
   const onSubmit = async (e) => {
     e.preventDefault();
 
     const {
       weight,
       sendingDate,
       paymentDate,
       packageTypes,
       sendingBranch,
       receivingBranch,
       specialNotes,
       orderStatus,
       sender,
       receiver,
       contactNumber,
       address,
     } = userInput;
 
     try {
       const res = await BranchManagerController.updateOrder(
        orderId,
         weight,
         sendingDate,
         paymentDate,
         parseInt(packageTypes),
         parseInt(sendingBranch),
         parseInt(receivingBranch),
         specialNotes,
         parseInt(orderStatus),
         sender,
         receiver,
         contactNumber,
         address
       );
 
       // Error handling
       if (res.error) {
         // alert(res.error);
         setShowErrorDialog(true);
       } else {
         // navigate(BranchManagerRoutes.dashboard)
         // setUdata(data);
         setShowErrorDialog(false);
         setShowSuccessDialog(true);
         console.log("Order Added Succeccfully");
       }
     } catch (e) {
       console.error(e);
       throw e;
     }
   };

   console.log("userInput", userInput);

  useEffect(() => {
    if (orderDetails) {

      // convert mysql date format to default date format yyyy-MM-dd
      const sendingDate = new Date(orderDetails.registeredDate)
      const formattedSendingDate = sendingDate.getFullYear() + "-" + (sendingDate.getMonth() + 1).toString().padStart(2, '0') + "-" + sendingDate.getDate().toString().padStart(2, '0');
      const paymentDate = new Date(orderDetails.paymentDate)
      const formattedPaymentDate = paymentDate.getFullYear() + "-" + (paymentDate.getMonth() + 1).toString().padStart(2, '0') + "-" + paymentDate.getDate().toString().padStart(2, '0');

      console.log("sending date", formattedSendingDate, "   ", formattedPaymentDate)

      setInputData((preval) => {
        return {
          ...preval,
          weight: orderDetails.weight,
          sendingDate: formattedSendingDate,
          paymentDate: formattedPaymentDate,
          packageTypes: orderDetails.packageTypeId,
          sendingBranch: orderDetails.sendingBranchId,
          receivingBranch: orderDetails.receivingBranchId,
          specialNotes: orderDetails.specialNotes,
          orderStatus: orderDetails.statusId,
          sender: orderDetails.senderNic,
          receiver: orderDetails.receiverName,
          contactNumber: orderDetails.receiverContactNumber,
          address: orderDetails.receiverAddress,
        };
      });

      // set select send nic value for SELECT sender dropdown
      setSelectedSenderNIC({
        value: orderDetails.senderNic,
        label: orderDetails.senderNic,
      });
    }
  }, [orderDetails]);

  async function deleteOrder(orderId) {
    let data = await BranchManagerController.deleteOrder(orderId);
    console.log("data", data);
    if (data.message === "Order Deleted Successfully") {
      navigate(BranchManagerRoutes.viewOrders);
    }else{
      setShowErrorDialog(false);
      setShowSuccessDialog(false);
      setShowErrorDeleteDialog(true);
    }
  }

  return (
    <Form>
      <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Order Updated Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>
      <Alert color="danger" isOpen={showErrorDeleteDialog} toggle={hideErrorDeleteDialog}> Can't delete this order!. Order assigned to delivery person </Alert>

      <Row>
        <Col className="col-md-8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-plus me-2"> </i>
              Update the Order
            </CardTitle>
            <CardBody>
              <FormGroup>
                <Label for="exampleEmail">Weight (g)</Label>
                <Input
                  id="packageWeight"
                  name="weight"
                  placeholder="Enter packge weight"
                  type="number"
                  invalid={validations.weight}
                  onChange={onChange}
                  value={userInput.weight}
                  required = {true}
                />
                <FormFeedback>Invalid weight</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="sendingDate">Sending Date</Label>
                <Input
                  id="sendingDate"
                  name="sendingDate"
                  placeholder="Enter sending date"
                  type="date"
                  onChange={onChange}
                  value={userInput.sendingDate}
                  required = {true}
                // value={formattedSendingDate}
                />
              </FormGroup>
              <FormGroup>
                <Label for="paymentDate">Payment Date</Label>
                <Input
                  id="paymentDate"
                  name="paymentDate"
                  placeholder="Enter payment date"
                  type="date"
                  // value={formattedSendingDate}
                  onChange={onChange}
                  value={userInput.paymentDate}
                  required = {true}
                />
              </FormGroup>
              <FormGroup>
                <Label for="packageTypes">Package Types</Label>
                <Input
                  id="packageTypes"
                  name="packageTypes"
                  type="select"
                  onChange={onChange}
                  value={userInput.packageTypes}
                  required = {true}
                >
                  {packageTypes.map((packageType) => {
                    return (
                      <DropdownOption
                        key={packageType.packageTypeId}
                        id={packageType.packageTypeId}
                        value={packageType.packageType}
                        onChange={onChange}
                      />
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="sendingBranch">Sending Branch</Label>
                <Input
                  id="sendingBranch"
                  name="sendingBranch"
                  type="select"
                  onChange={onChange}
                  value={userInput.sendingBranch}
                  disabled = {true}
                  required = {true}
                >
                  {branches.map((branch) => {
                    return (
                      <DropdownOption
                        key={branch.branchId}
                        id={branch.branchId}
                        value={branch.district}
                        onChange={onChange}
                      />
                    );
                  })}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="receivingBranch">Receiving Branch</Label>
                <Input
                  id="receivingBranch"
                  name="receivingBranch"
                  type="select"
                  onChange={onChange}
                  value={userInput.receivingBranch}
                  required = {true}
                >
                  {branches.map((branch) => {
                    return (
                      <DropdownOption
                        key={branch.branchId}
                        id={branch.branchId}
                        value={branch.district}
                        onChange={onChange}
                      />
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="specialNotes">Speicial Notes</Label>
                <Input
                  id="specialNotes"
                  name="specialNotes"
                  type="textarea"
                  placeholder="If you have any special notes. Type here..."
                  onChange={onChange}
                  value={userInput.specialNotes}
                />
              </FormGroup>
              {/* <legend className="mt-2">Order Status</legend> */}
              <FormGroup>
                <Label for="orderStatus">Order Status</Label>
                <Input
                  id="orderStatus"
                  name="orderStatus"
                  type="select"
                  onChange={onChange}
                  value={userInput.orderStatus}
                  required = {true}
                >
                  {orderStatus.map((orderStat) => {
                    return (
                      <DropdownOption
                        key={orderStat.statusId}
                        id={orderStat.statusId}
                        value={orderStat.status}
                        onChange={onChange}
                      />
                    );
                  })}
                </Input>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>

        <Col className="col-md-4">
          <Card>
            <CardBody>
              <legend className="mt-2">Sender</legend>
              <FormGroup>
                <Label for="sender">Sender</Label>
                <Select
                  id="sender"
                  name="sender"
                  value={selectedSenderNIC}
                  onChange={handleSenderChange}
                  options={clientNICs}
                  required = {true}
                />
              </FormGroup>
              <legend className="mt-2">Receiver</legend>
              <FormGroup>
                <Label for="receiver">Name</Label>
                <Input
                  id="receiver"
                  name="receiver"
                  placeholder="Enter packge receiver name"
                  type="text"
                  invalid={validations.receiver}
                  onChange={onChange}
                  value={userInput.receiver}
                  required = {true}
                />
                <FormFeedback>Invalid name</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter receiver contact number"
                  type="number"
                  invalid={validations.contactNumber}
                  onChange={onChange}
                  value={userInput.contactNumber}
                  required = {true}
                />
                <FormFeedback>Invalid contact number</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter destination address"
                  type="textarea"
                  onChange={onChange}
                  value={userInput.address}
                  required = {true}
                />
              </FormGroup>
              <legend className="mt-2">
                Courier Fee - <b>Rs. {courierFee}</b>
              </legend>
              {/* <FormGroup check className="form-label">
                <Input type="checkbox" /> <Label check>Check me out</Label>
              </FormGroup> */}

              <Button type="submit" disabled={!isFormValid()} onClick={onSubmit} className="btn mt-4 w-100 pt-2 pb-2 bg-primary border">
                Update the Order
              </Button>
              <Button
                type="reset"
                className="btn mt-2 w-100 pt-2 pb-2 bg-danger border"
                onClick={() => {
                  deleteOrder(orderId);
                }}
              >
                Delete the Order
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewOrder;
