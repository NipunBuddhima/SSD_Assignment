import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Form, FormGroup, FormFeedback, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UserController from "../controllers/user.controller";
import user from "../../../assets/images/users/user1.jpg";
import React , { useEffect, useState } from "react";

const ViewClientsTable = () => {

  let [clients, setClients] = useState([]);
  let [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState({});
  
  // create map for input data to update form
  const [inputData, setInputData] = useState({
    nic: "",
    email: "",
    name: "",
    address: "",
    contactNumber: "",
  });

  // create validations map to validate form
  const [validations, setValidations] = useState({
    nic: false,
    email: false,
    name: false,
    address: false,
    contactNumber: false,
  });

  // create onChange function to update form data
  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // create selectEditButton function to select client to edit
  const selectEditButton = (tdata) => {
    setSelectedPerson(tdata);
    setInputData({
      name: tdata.fullName,
      email: tdata.email,
      nic: tdata.nic,
      address: tdata.address,
      contactNumber: tdata.contactNumber,
      district: tdata.district
    });
    toggleEditModal();
  };

  // create function to get all clients
  const getClients = async () => {
    try {
      let response = await UserController.getAllClients();
      if (response.error) {
        console.error("Error fetching clients:", response.error);
      } else {
        setClients(response.data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // create function to update client data
  const updateClient = async () => {
    let response = await UserController.updateClient(selectedPerson.nic, inputData);
    if (response.error) {
      console.error("Error updating client:", response.error);
     
    } else {
      console.log("Client updated successfully");
      await getClients();
    }
    setSelectedPerson();
    toggleEditModal();
  };

  // create function to delete client data
  const deleteClient = async () => {
    let response = await UserController.deleteClient(selectedPerson.nic);
    if (response.error) {
      console.error("Error deleting client:", response.error);
   } else {
      console.log("Client deleted successfully");
      await getClients();
    }
    setSelectedPerson();
    toggleEditModal();
  };

  // create function to toggle edit modal
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  // Use effect to get all clients when component is mounted
  useEffect(() => {
    getClients();
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Client List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Clients belongs to the branch
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>NIC</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={user}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.fullName}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.nic}</td>
                  <td>{tdata.address}</td>
                  <td>{tdata.contactNumber}</td>
                  <td>{tdata.district}</td>  
                  <td>
                    <Button  className="btn me-2" outline color="secondary" size="sm" onClick={() => selectEditButton(tdata)}>Edit</Button>
                  </td>             
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      
      {/* Create a Modal for update and delete clients */}

      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Client</ModalHeader>
        <ModalBody>
        <Form>
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
                  disabled
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
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateClient}>Save</Button>{' '}
          <Button color="danger" onClick={deleteClient}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
};

export default ViewClientsTable;
