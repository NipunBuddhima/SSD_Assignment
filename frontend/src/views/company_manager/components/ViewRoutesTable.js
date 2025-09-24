import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, Alert } from "reactstrap";
import user from "../../../assets/images/users/user.jpg";
import React, { useEffect, useState } from "react";
import UserController from "../controllers/user.controller";
import DropdownOption from "../../../components/common/DropdownOption";



const ViewRoutesTable = () => {

  // Alert
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const hideSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  const hideErrorDialog = () => {
    setShowErrorDialog(false);
  };

  const [routes, setRoutes] = useState([]);
  const [branches, setBranches] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [inputData, setInputData] = useState({
    routeId: "",
    routeName: "",
    fBranchName: "",
    sBranchName: "",
    secondBranchId: "",
    firstBranchId: "",
  });

  const [validations, setValidations] = useState({
    routeName: false,
  });

  // Toggle edit modal
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  // On change input
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // Fetch all routes
  async function fetchAllRoutes() {
    let response = await UserController.getAllRoutesForTable();
    if (response.error) {
      alert(response.error);
    } else {
      setRoutes(response);
    }
  }

  // Fetch all branches
  async function fetchAllBranches() {
    let response = await UserController.getAllBranches();
    if (response.error) {
      alert(response.error);
    } else {
      setBranches(response);
    }
  }
  
  // Update route
  async function updateRoute() {
    let response = await UserController.updateRoute(inputData);
    if (response.error) {
      toggleEditModal();
      setShowSuccessDialog(false);
      setShowErrorDialog(true);
    } else {
      setShowErrorDialog(false);
      toggleEditModal();
      fetchAllRoutes();
      setShowSuccessDialog(true);
    }
  }

  // Delete route
  async function deleteRoute(routeId) {
    let response = await UserController.deleteRoute(routeId);
    if (response.error) {
      toggleEditModal();
      setShowSuccessDialog(false);
      setShowErrorDialog(true);
    } else {
      setShowErrorDialog(false);
      toggleEditModal();
      fetchAllRoutes();
      setShowSuccessDialog(true);
    }
  }

  useEffect(() => {
    fetchAllRoutes();
    fetchAllBranches();
  }, []);




  return (
    <div>
           <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Performe Successfully!</Alert>
      <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Can not delete routes which are assigned to a transport agent </Alert>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Routers List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Routes..
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>

                <th>Route ID</th>
                <th>Route Name</th>
                <th>First Branch</th>
                <th>Second Branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((tdata, index) => (
                <tr key={index} className="border-top">

                  <td>{tdata.routeId}</td>
                  <td>{tdata.routeName}</td>
                  <td>{tdata.firstBranch}</td>
                  <td>{tdata.secondBranch}</td>


                  <td>
                    <Button className="btn me-2" outline color="secondary" size="sm"
                    onClick={
                      () => {
                        setInputData({
                          routeId: tdata.routeId,
                          routeName: tdata.routeName,
                          firstBranchId: tdata.firstBranchId,
                          secondBranchId: tdata.secondBranchId,
                          fBranchName: tdata.firstBranch,
                          sBranchName: tdata.secondBranch
                        });

                        toggleEditModal();
                      }
                    
                    }>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Route</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup>
              <Label for="routeName">Route Name</Label>
              <Input
                id="routeName"
                name="routeName"
                placeholder="Enter a route name"
                type="text"
                value={inputData.routeName}
                onChange={onChange}
                invalid={validations.routeName}
                required={true}
              />
              <FormFeedback>Enter a valid route name</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="firstBranchId">Assign First Branch</Label>
              <Input
                id="firstBranchId"
                name="firstBranchId"
                type="select"
                onChange={onChange}
                value={inputData.firstBranchId}
                required={true}
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
              <Label for="secondBranchId">Assign Second Branch</Label>
              <Input
                id="secondBranchId"
                name="secondBranchId"
                type="select"
                onChange={onChange}
                value={inputData.secondBranchId}
                required={true}
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

          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={
            () => {
              updateRoute();
            }
          }>Save</Button>{' '}
          <Button color="danger" onClick={
            () => {
              deleteRoute(inputData.routeId);
            }
          }>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default ViewRoutesTable;
