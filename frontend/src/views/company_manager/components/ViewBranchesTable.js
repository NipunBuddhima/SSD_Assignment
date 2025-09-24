import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";import user from "../../../assets/images/users/user.jpg";
import React , { useEffect, useState } from "react";
import UserController from "../controllers/user.controller";

const ViewBranchTable = () => {

  const [branches, setBranches] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const [inputData, setInputData] = useState({
    district: "",
    address: "",
    mapLocation: "",
    contactNumber: "",
  });


  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // function to get all branches
  const getBranches = async () => {
    try {
      const response = await UserController.getAllBranches();
      setBranches(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // function to update a branch
  const updateBranch = async () => {
    try {
      const response = await UserController.updateBranch(inputData);
      if (response.error) {
        console.error("Error: ", response.error);
      } else {
        toggleEditModal();
        getBranches();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // function to delete a branch
  const deleteBranch = async (branchId) => {
    try {
      const response = await UserController.deleteBranch(branchId);
      if (response.error) {
        console.error("Error: ", response.error);
      } else {
        toggleEditModal();
        getBranches();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const [validations, setValidations] = useState({
    district: false,
    address: false,
    mapLocation: false,
    contactNumber: false,
  });

  useEffect(() => {
    getBranches();
  }
  , []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Branches List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          branch....
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                
                <th>Branch ID</th>
                <th>District</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((tdata, index) => (
                <tr key={index} className="border-top">
               
                  <td>{tdata.branchId}</td>
                  <td>{tdata.district}</td>
                  <td>{tdata.address}</td>
                  <td>{tdata.contactNumber}</td>
                  
                  
                  <td>
                    <Button  className="btn me-2" outline color="secondary" size="sm"
                    onClick={
                      () => {
                        setEditModalOpen(true);
                        setInputData({
                          branchId: tdata.branchId,
                          district: tdata.district,
                          address: tdata.address,
                          mapLocation: tdata.mapLocation,
                          contactNumber: tdata.contactNumber,
                        });
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
        <ModalHeader toggle={toggleEditModal}>Edit Branch</ModalHeader>
        <ModalBody>
        <Form>
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

        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={
            () => {
              updateBranch();
            }
          }>Save</Button>{' '}
          <Button color="danger" onClick={
            () => {
              deleteBranch(inputData.branchId);
            }
          }>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default ViewBranchTable;
