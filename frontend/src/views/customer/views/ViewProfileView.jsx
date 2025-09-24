import {
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardTitle,
    Container,
    FormGroup,
    Input,
    Row,
    Alert,
    Col,
    Form,
    Label,
    FormFeedback,
    Button
} from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserController from "../controllers/user.controller.js";
import useCookie from "../../../hooks/useCookies.js";


const ViewProfileView = () => {

    // Alert
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const hideErrorDialog = () => setShowErrorDialog(false);

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const hideSuccessDialog = () => setShowSuccessDialog(false);

    const [getCookie] = useCookie();

    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        nic: "",
        email: "",
        name: "",
        address: "",
        contactNumber: "",
    });

    const [validations, setValidations] = useState({
        nic: false,
        email: false,
        name: false,
        address: false,
        contactNumber: false,
    });

    const onChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }


    // create a function to update client details
    const updateClientDetails = () => {
        const userNic = getCookie("user-nic");
        UserController.updateClientDetails(userNic, inputData)
            .then((response) => {
                setShowErrorDialog(false);
                setShowSuccessDialog(true);
            }
            )
            .catch((error) => {
                setShowSuccessDialog(false);
                setShowErrorDialog(true);
            }
            );
    }

    // create a function to fetch client details
    const fetchClientDetails = () => {
        const userNic = getCookie("user-nic");
        UserController.getClientDetailsByUserNic(userNic)
            .then((response) => {
                setInputData({
                    nic: response.data.nic,
                    email: response.data.email,
                    name: response.data.fullName,
                    address: response.data.address,
                    contactNumber: response.data.contactNumber,
                });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // call the function in the useEffect
    useEffect(() => {
        fetchClientDetails();
    }, []);


    return (

        <Container>

            <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Update Details Update Successfully!</Alert>
            <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong </Alert>
            <Row className="justify-content-center">
                <Col className="col-md-8">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-sign-turn-right me-2"> </i>
                            Your Profile
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
                                    required={true}
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
                                    required={true}
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
                                    required={true}
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
                                    required={true}
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
                                    required={true}
                                />
                                <FormFeedback>Enter a valid contact number</FormFeedback>
                            </FormGroup>


                            <Button className="btn mt-4 w-100 pt-2 pb-2 bg-primary border" onClick={
                                () => {
                                    setShowErrorDialog(false);
                                    setShowSuccessDialog(true);
                                    updateClientDetails();
                                }
                            }>Update My Details</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>


    );
};

export default ViewProfileView;