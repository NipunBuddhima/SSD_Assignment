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
import UserController from "../controllers/user.controller.js";
import { ManagerRoutes } from "../../../routes/all_user.routes.js";
import validator from "../../../validation/validation.js";


const AddNewBranch = () => {

  // Alert
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const hideSuccessDialog = () => { setShowSuccessDialog(false); navigate(ManagerRoutes.dashboard); }

  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const hideErrorDialog = () => setShowErrorDialog(false);

  let {
    validateNIC,
    validateEmail,
    validateName,
    validateAddress,
    validatePhoneNumber,
  } = validator();


  // Create object for use navigator
  const navigate = useNavigate();

  // Map variable
  const [inputData, setInputData] = useState({
    district: "",
    address: "",
    mapLocation: "",
    contactNumber: "",
  })

  // Validation data map
  const [validations, setValidations] = useState({
    district: false,
    address: false,
    contactNumber: false,
  });

  // onChange Form validation
  const validateField = (name, value) => {
    switch (name) {
      case 'district':
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

    const { district, address, mapLocation, contactNumber } = inputData;

    try {
      const res = await UserController.addBranch(district, address, mapLocation, contactNumber);

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
      <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Branch Added Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>
      <Row className="justify-content-center">
        <Col className="col-md-8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-house-add me-2"> </i>
              Add a New Branch
            </CardTitle>
            <CardBody>
              <FormGroup>
                <Label for="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="Enter branch district"
                  type="text"
                  value={inputData.district}
                  onChange={onChange}
                  invalid={validations.district}
                  required = {true}
                />
                <FormFeedback>Enter a valid district</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter branch address"
                  type="text"
                  onChange={onChange}
                  value={inputData.address}
                  invalid = {validations.address}
                  required = {true}
                />
                <FormFeedback>Enter a valid address</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="mapLocation">Map Location</Label>
                <Input
                  id="mapLocation"
                  name="mapLocation"
                  placeholder="Enter the branch map location URL"
                  type="text"
                  value={inputData.mapLocation}
                  onChange={onChange}
                  required = {true}
                />
              </FormGroup>
              <FormGroup>
                <Label for="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter branch contact number"
                  type="number"
                  value={inputData.contactNumber}
                  onChange={onChange}
                  invalid={validations.contactNumber}
                  required = {true}
                />
                <FormFeedback>Enter a valid contact number</FormFeedback>
              </FormGroup>

              <Button type="submit" disabled={!isFormValid()} onClick={onSubmit} className="btn mt-4 w-100 pt-2 pb-2 bg-primary border">Add the Branch</Button>
              <Button type="reset" className="btn mt-2 w-100 pt-2 pb-2 bg-danger border">Reset Details</Button>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};


export default AddNewBranch;

