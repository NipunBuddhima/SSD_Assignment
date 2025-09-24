import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form, FormFeedback,Row,Col,BreadcrumbItem,Breadcrumb,Container } from "reactstrap";
import UserService from "../services/user.service";

const ViewDeliverPersonsList = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [formData, setFormData] = useState({
    nic: "",
    email: "",
    fullName: "",
    address: "",
    contactNumber: "",
    vehicleNumber: "",
    branchId: "1",
  });

  const [validations, setValidations] = useState({
    nic: false,
    email: false,
    fullName: false,
    address: false,
    contactNumber: false,
    vehicleNumber: false,
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const confirmDelete = (person) => {
    setSelectedPerson(person);
    toggleModal();
  };

  const fetchDeliveryPersons = async () => {
    try {
      const response = await UserService.getAllDeliveryPersons();
      setDeliveryPersons(response.data);
    } catch (error) {
      console.error("Error fetching delivery persons:", error);
    }
  };

  const updateFormData = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };

  const validateField = (name, value) => {
    switch (name) {
      case "nic":
        return !value === "";
      case "email":
        return !validateEmail(value);
      case "fullName":
        return !validateName(value);
      case "address":
        return !value === "";
      case "contactNumber":
        return !value === "";
      case "vehicleNumber":
        return !value === "";
      default:
        return true;
    }
  };

  const validateEmail = (email) => {
    // Email validation logic
    return true;
  };

  const validateName = (name) => {
    // Name validation logic
    return true;
  };

  const updateDeliveryPerson = async () => {
    try {
      await UserService.updateDeliveryPerson(selectedPerson.nic, formData);
      await fetchDeliveryPersons()
    } catch (error) {

    } finally {
      setSelectedPerson()
      toggleModal()
    }
  };



  const deleteDeliveryPerson = async () => {
    try {
        await UserService.deleteDeliveryPerson(selectedPerson.nic);
        await fetchDeliveryPersons();
        toggleModal();
    } catch (error) {
        console.error("Error deleting delivery person:", error);
          
            alert('Cannot delete delivery person with active orders');
        
        toggleModal();
    }
};

  useEffect(() => {
    fetchDeliveryPersons();
  }, []);

  return (
    <div>
      
    <Container>

{/* Breadcrumb and search bar */}
<Form>
    <Row className="d-flex">
      <Col lg="8" className="align-content-center">
        {/* Breadcrumbs */}
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#">
              Home
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="#">
              Delivery Manamagement
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            View All Delivery persons
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col lg="3">
        <FormGroup>
          <Input
            className="pt-2 pb-2"
            id="deliveryPerson"
            name="deliveryPerson"
            placeholder="Search Delivery persons..."
            type="text"
         
          />
          <FormFeedback>Enter a valid dilivery person</FormFeedback>
        </FormGroup>
      </Col>
      <Col lg="1">
        <Button style={{"margin-top" : "3px"}} color="primary">Search</Button>
      </Col>
    </Row>
  </Form>

<Row>

  <Col lg="12">
      <Card>
        <CardBody>
          <CardTitle tag="h5">Delivery Person List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Delivery persons
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th> </th>
                <th>Name</th>
                <th>Email</th>
                <th>NIC</th>
                <th>Address</th>
                <th>Contact Number</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deliveryPersons.map((person, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{person.fullName}</td>
                  <td>{person.email}</td>
                  <td>{person.nic}</td>
                  <td>{person.address}</td>
                  <td>{person.contactNumber}</td>

                  <td>
                    <Button
                      className="me-2"
                      outline
                      color="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedPerson(person);
                        setFormData({
                          nic: person.nic,
                          email: person.email,
                          fullName: person.fullName,
                          address: person.address,
                          contactNumber: person.contactNumber,
                          vehicleNumber: person.vehicleNumber,
                          branchId: person.branchId.toString(),
                        });
                        toggleModal();
                      }}
                    >
                      Edit
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Delivery Person</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nic">Delivery Person NIC</Label>
              <Input
                id="nic"
                name="nic"
                disabled
                placeholder="Enter delivery person's NIC"
                type="text"

                value={formData.nic}
                onChange={(e) => updateFormData("nic", e.target.value)}
                invalid={validations.nic}
                required
              />
              <FormFeedback>Enter a valid NIC number</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                disabled={true}
                placeholder="Enter email address"
                type="email"
                onChange={(e) => updateFormData("email", e.target.value)}
                value={formData.email}
                invalid={validations.email}
                required
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
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                invalid={validations.fullName}
                required
              />
              <FormFeedback>Enter a valid name</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter delivery person's home address"
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                invalid={validations.address}
                required
              />
              <FormFeedback>Enter a valid address</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter contact number"
                type="text"
                value={formData.contactNumber}
                onChange={(e) => updateFormData("contactNumber", e.target.value)}
                invalid={validations.contactNumber}
                required
              />
              <FormFeedback>Enter a valid contact number</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                name="vehicleNumber"
                placeholder="Enter vehicle number"
                type="text"
                value={formData.vehicleNumber}
                onChange={(e) => updateFormData("vehicleNumber", e.target.value)}
                invalid={validations.vehicleNumber}
                required
              />
              <FormFeedback>Enter a valid vehicle number</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateDeliveryPerson}>
            Update
          </Button>{" "}
          <Button color="danger" onClick={() => {
            deleteDeliveryPerson(selectedPerson.nic)
          }}>
            Delete
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      </Col>
 
 </Row>
 </Container>
    </div>

   
  );
};

export default ViewDeliverPersonsList;

