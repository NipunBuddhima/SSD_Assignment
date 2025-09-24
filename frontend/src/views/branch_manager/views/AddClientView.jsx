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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from "../../../hooks/useCookies";
import BranchManagerController from "../controllers/user.controller.js";
import { BranchManagerRoutes } from "../../../routes/all_user.routes";
import validator from "../../../validation/validation.js";


const AddNewClient = () => {

  // Alert
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const hideSuccessDialog = () => { setShowSuccessDialog(false); navigate(BranchManagerRoutes.dashboard); }

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const hideErrorDialog = () => setShowErrorDialog(false);

  // Validation regexs
  let {
    validateNIC,
    validateEmail,
    validateName,
    validateAddress,
    validatePhoneNumber,
  } = validator();


  // Create object for use navigator
  const navigate = useNavigate();

  const [getCookie, setCookie] = useCookie();

  // Map variable
  const [inputData, setInputData] = useState({
    nic: "",
    email: "",
    name: "",
    address: "",
    contactNumber: "",
  })

  // Validation data map
  const [validations, setValidations] = useState({
    nic: false,
    email: false,
    name: false,
    address: false,
    contactNumber: false,
  });

  // onChange Form validation
  const validateField = (name, value) => {
    switch (name) {
      case 'nic':
        return (!value == "");
      case 'email':
        return (validateEmail(value));
      case 'name':
        return (validateName(value));
      case 'address':
        return (!value == "");
      case 'contactNumber':
        return (!value == "");
      default:
        return true;
    }
  };

  // onChange
  const onChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputData((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
    // onChange Form validation data set on change
    setValidations({
      ...validations,
      [name]: !validateField(name, value) // Not sign for conver false to true
    });
  }

  // Check form valid status to appear submit buttons
  const isFormValid = () => {
    for (const key in validations) {
      if (validations[key]) {
        return false;
      }
    }
    return true;
  };


  // onSubmit
  const onSubmit = async (e) => {

    e.preventDefault();

    const { nic, email, name, address, contactNumber } = inputData;
    let branchId = getCookie('user-branch-id');

    try {
      const res = await BranchManagerController.addClient(nic, email, name, address, contactNumber, branchId);

      // Error handling
      if (res.error) {
        // alert(res.error);
        setShowErrorDialog(true);
      }
      else {
        // alert(res.message);
        // navigate(BranchManagerRoutes.dashboard);
        setShowErrorDialog(false);
        setShowSuccessDialog(true);
      }
    }
    catch (e) {
      console.error(e);
      throw e;
    }
  }


  return (
    <Form>
      <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Client Added Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>
      <Row className="justify-content-center">
        <Col className="col-md-8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-person-add me-2"> </i>
              Add a New Client
            </CardTitle>
            <CardBody>
              <FormGroup>
                <Label for="customerNic">Client NIC </Label>
                <Input
                  id="customerNic"
                  name="nic"
                  placeholder="Enter client nic"
                  type="text"
                  value={inputData.nic}
                  onChange={onChange}
                  invalid={validations.nic}
                  required = {true}
                />
                <FormFeedback>Enter a valid NIC number</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="customerEmail">E-mail</Label>
                <Input
                  id="customerEmail"
                  name="email"
                  placeholder="Enter email address"
                  type="email"
                  onChange={onChange}
                  value={inputData.email}
                  invalid={validations.email}
                  required = {true}
                />
                <FormFeedback>Enter a valid email address</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="customerName">Full Name</Label>
                <Input
                  id="customerName"
                  name="name"
                  placeholder="Enter full name"
                  type="text"
                  value={inputData.name}
                  onChange={onChange}
                  invalid={validations.name}
                  required = {true}
                />
                <FormFeedback>Enter a valid name</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="customerAddress">Address</Label>
                <Input
                  id="customerAddress"
                  name="address"
                  placeholder="Enter Address"
                  type="textarea"
                  value={inputData.address}
                  onChange={onChange}
                  invalid={validations.address}
                  required = {true}
                />
                <FormFeedback>Enter a valid address</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="customerContactNo">Contact Number</Label>
                <Input
                  id="customerContactNo"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  type="number"
                  value={inputData.contactNumber}
                  onChange={onChange}
                  invalid={validations.contactNumber}
                  required = {true}
                />
                <FormFeedback>Enter a valid contact number</FormFeedback>
              </FormGroup>



              <Button type="submit" disabled={!isFormValid()} onClick={onSubmit} className="btn mt-4 w-100 pt-2 pb-2 bg-primary border">Add the Client</Button>
              <Button type="reset" className="btn mt-2 w-100 pt-2 pb-2 bg-danger border">Reset Details</Button>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};


export default AddNewClient;

