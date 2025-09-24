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
import {ClientRoutes} from "../../../routes/all_user.routes.js";

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

    const [password, setPassword] = useState("")
    const [passwordReEnter, setPasswordReEnter] = useState("")

    const [validations, setValidations] = useState({
        password: false,
        passwordReEnter: false
    });

    const onChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
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


    // create a function to check password matching
    const checkPasswordMatching = () => {
        if (password === passwordReEnter) {
            setValidations({
                ...validations,
                password: false,
                passwordReEnter: false
            });
            updateClientPassword();
            setShowErrorDialog(false);
            setShowSuccessDialog(true);
            // navigate(ClientRoutes.dashboard);
        } else {
            setValidations({
                ...validations,
                passwordReEnter: true
            });
            setShowSuccessDialog(false);
            setShowErrorDialog(true);
        }
    }

    // create a function to update client password
    const updateClientPassword = () => {
        const userNic = getCookie("user-nic");
        UserController.updateClientPassword(userNic, password)
            .then((response) => {
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

            <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Password Update Successfully!</Alert>
            <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Password Update Failed! Password Mismatching </Alert>
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
                                    required={true}
                                    disabled
                                />
                                <FormFeedback>Enter a valid NIC number</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="newPassword">New Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Enter your new password"
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    invalid={validations.password}
                                    required={true}
                                />
                                <FormFeedback>Enter a valid contact number</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="newPassword">Re Enter Your Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    placeholder="Re enter your password"
                                    type="text"
                                    value={passwordReEnter}
                                    onChange={(e) => setPasswordReEnter(e.target.value)}
                                    invalid={validations.passwordReEnter}
                                    required={true}
                                />
                                <FormFeedback>Password Not Matching</FormFeedback>
                            </FormGroup>


                            <Button className="btn mt-4 w-100 pt-2 pb-2 bg-primary border" onClick={
                                () => {
                                    checkPasswordMatching();
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