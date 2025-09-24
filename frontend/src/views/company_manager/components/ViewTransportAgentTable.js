import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import user from "../../../assets/images/users/user.jpg";
import React, { useEffect, useState } from "react";
import UserController from "../controllers/user.controller";
import DropdownOption from "../../../components/common/DropdownOption.jsx";


const ViewTransportAgentTable = () => {

  const [transportAgents, setTransportAgents] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const [inputData, setInputData] = useState({
    nic: "",
    email: "",
    fullName: "",
    vehicleNumber: "",
    routeId: "",
    routeName: "",
  });

  const [validations, setValidations] = useState({
    nic: false,
    email: false,
    fullName: false,
    vehicleNumber: false,
  });

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };


  // function to get all routes
  const getRoutes = async () => {
    try {
      const response = await UserController.getAllRoutes();
      setRoutes(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // function to update a transport agent
  const updateTransportAgent = async () => {
    try {
      console.log("inputData: ", inputData);
      const response = await UserController.updateTransportAgent(inputData);
      if (response.error) {
        console.error("Error: ", response.error);
      } else {
        getTransportAgents();
        toggleEditModal();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // function to delete a transport agent
  const deleteTransportAgent = async (nic) => {
    try {
      const response = await UserController.deleteTransportAgent(nic);
      if (response.error) {
        console.error("Error: ", response.error);
      } else {
        getTransportAgents();
        toggleEditModal();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // function to get all transport agents
  const getTransportAgents = async () => {
    try {
      const response = await UserController.getAllTransportAgents();
      setTransportAgents(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getTransportAgents();
    getRoutes();
  }, []);


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">TransportAgent List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            TransportAgent belongs to the branch
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>

                <th>NIC</th>
                <th>Full Name</th>
                <th>E-mail</th>
                <th>VehicleNumber</th>
                <th>Route</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transportAgents.map((tdata, index) => (
                <tr key={index} className="border-top">

                  <td>{tdata.nic}</td>
                  <td>{tdata.fullName}</td>
                  <td>{tdata.email}</td>
                  <td>{tdata.vehicleNumber}</td>
                  <td>{tdata.routeName}</td>

                  <td>
                    <Button className="btn me-2" outline color="secondary" size="sm"
                    onClick={
                      () => {
                        setInputData(
                          {
                            nic: tdata.nic,
                            email: tdata.email,
                            fullName: tdata.fullName,
                            vehicleNumber: tdata.vehicleNumber,
                            routeId: tdata.routeId,
                            routeName: tdata.routeName,
                          }
                        );
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
        <ModalHeader toggle={toggleEditModal}>Edit Branch</ModalHeader>
        <ModalBody>
          <Form>

            <FormGroup>
              <Label for="nic">Transport Agent NIC </Label>
              <Input
                id="nic"
                name="nic"
                placeholder="Enter transport agent NIC"
                type="text"
                value={inputData.nic}
                onChange={onChange}
                invalid={validations.nic}
                required={true}
              />
              <FormFeedback>Enter a valid NIC number</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter customer email"
                type="email"
                onChange={onChange}
                value={inputData.email}
                invalid={validations.email}
                required={true}
              />
              <FormFeedback>Enter a valid email address</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                type="text"
                value={inputData.fullName}
                onChange={onChange}
                invalid={validations.fullName}
                required={true}
              />
              <FormFeedback>Enter a valid name</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                name="vehicleNumber"
                placeholder="Enter transport agent's vehicle number"
                type="text"
                value={inputData.vehicleNumber}
                onChange={onChange}
                invalid={validations.vehicleNumber}
                required={true}
              />
              <FormFeedback>Enter a valid vehicle number  </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="routeId">Assign a Route</Label>
              <Input
                id="routeId"
                name="routeId"
                type="select"
                onChange={onChange}
                value={inputData.routeId}
                required={true}
              >
                {routes.map((route) => {
                  return (
                    <DropdownOption
                      key={route.routeId}
                      id={route.routeId}
                      value={route.routeName}
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
              updateTransportAgent();
            }
          }>Save</Button>{' '}
          <Button color="danger" onClick={
            () => {
              deleteTransportAgent(inputData.nic);
            }
          }>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default ViewTransportAgentTable;
