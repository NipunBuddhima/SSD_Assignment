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
import { useNavigate } from "react-router-dom";
import Select from "react-select";


//New import for component dropdown option
import DropdownOption from "../../../components/common/DropdownOption.jsx";
// Import frontend controller
import useAddOrderHook from "../hooks/useAddOrderHook";


const AddNewOrder = () => {

  let {
    clientNICs,
    selectedSenderNIC,
    branches,
    packageTypes,
    orderStatus,
    showSuccessDialog,
    showErrorDialog,
    courierFee,
    userInput,
    hideSuccessDialog,
    hideErrorDialog,
    currentDate,
    validations,
    validateField,
    isFormValid,
    onChange,
    handleSenderChange,
    onSubmit,
  } = useAddOrderHook();

  return (
    <Form>
      <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Order Placed Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>
      <Row>
        <Col className="col-md-8">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-plus me-2"> </i>
              Add a New Order
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
                  disabled = {true}
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
                Submit the Order
              </Button>
              <Button
                type="reset"
                className="btn mt-2 w-100 pt-2 pb-2 bg-danger border"
              >
                Reset Details
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default AddNewOrder;
