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
    Alert,
} from "reactstrap";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientRoutes } from "../../../routes/all_user.routes.js";
import validator from "../../../validation/validation.js";
import DropdownOption from "../../../components/common/DropdownOption.jsx";
import UserController from "../controllers/user.controller.js";
import useCookie from "../../../hooks/useCookies.js";


const AddNewTicket = () => {

    // Alert
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const hideSuccessDialog = () => { setShowSuccessDialog(false); navigate(ClientRoutes.dashboard); }

    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const hideErrorDialog = () => setShowErrorDialog(false);

    // Create an object to use cookies
    let [getCookie, setCookie] = useCookie();

    // Validation regex
    let {
        validateNIC,
        validateEmail,
        validateName,
        validateAddress,
        validatePhoneNumber,
    } = validator();


    // Create object for use navigator
    const navigate = useNavigate();

    // Dropdown state variables
    let [branches, setBranches] = useState([]);
    let [reasons, setReasons] = useState([]);

    useEffect(() => {
        //Fetch branches to fill dropdown
        async function fetchAllBranches() {
            let response = await UserController.getAllBranches();
            if (response.error) {
                alert(response.error);
            }
            else {
                setBranches(response.data);
            }
        }

        // Fetch reasons to fill dropdown
        async function fetchAllReasons() {
            let response = await UserController.getAllReasons();
            if (response.error) {
                alert(response.error);
            }
            else {
                setReasons(response.data);
            }
        }

        // get user branch with cookies
        let userNic = getCookie('user-nic');

        // Save previous data and save new data
        setInputData((prev) => {
            return { ...prev, nic: userNic }
        });

        fetchAllBranches();
        fetchAllReasons();
    }, []);

    // Map variable
    const [inputData, setInputData] = useState({
        nic: "",
        branchId: "1",
        reasonId: "1",
        message: "",
        responseStatusId: "1",
    })

    // Validation data map
    const [validations, setValidations] = useState({
        nic: false,
        message: false,
    });

    // onChange Form validation
    const validateField = (name, value) => {
        switch (name) {
            case 'message':
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

        const {
            nic,
            branchId,
            reasonId,
            message,
            responseStatusId
        } = inputData;

        try {
            const res = await UserController.addTicket(
                nic,
                branchId,
                reasonId,
                message,
                responseStatusId
            );

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
            <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Ticket Submitted Successfully!</Alert>
            <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>
            <Row className="justify-content-center">
                <Col className="col-md-8">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-envelope-plus me-2"> </i>
                            Add a New Ticket
                        </CardTitle>
                        <CardBody>
                            <FormGroup>
                                <Label for="nic">User NIC</Label>
                                <Input
                                    id="nic"
                                    name="nic"
                                    placeholder="Enter transport agent NIC"
                                    type="text"
                                    value={inputData.nic}
                                    onChange={onChange}
                                    disabled={true}     
                                    required = {true}                           />
                            </FormGroup>

                            <FormGroup>
                                <Label for="branchId">Select the Branch</Label>
                                <Input
                                    id="branchId"
                                    name="branchId"
                                    type="select"
                                    onChange={onChange}
                                    value={inputData.branchId}
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
                                <Label for="reasonId">Select the reason</Label>
                                <Input
                                    id="reasonId"
                                    name="reasonId"
                                    type="select"
                                    onChange={onChange}
                                    value={inputData.reasonId}
                                    required = {true}
                                >
                                    {reasons.map((reason) => {
                                        return (
                                            <DropdownOption
                                                key={reason.reasonId}
                                                id={reason.reasonId}
                                                value={reason.reason}
                                                onChange={onChange}
                                            />
                                        );
                                    })}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="message">Message</Label>
                                <Input
                                    id="message"
                                    name="message"
                                    placeholder="Type your problem here.."
                                    type="textarea"
                                    value={inputData.message}
                                    onChange={onChange}
                                    invalid = {validations.message}
                                    required = {true}                              />
                                <FormFeedback>Enter a ticket message body   </FormFeedback>
                            </FormGroup>

                            <Button type="submit" disabled={!isFormValid()} onClick={onSubmit} className="btn mt-4 w-100 pt-2 pb-2 bg-primary border">Open The Ticket</Button>
                            <Button type="reset" className="btn mt-2 w-100 pt-2 pb-2 bg-danger border">Reset Details</Button>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};


export default AddNewTicket;

