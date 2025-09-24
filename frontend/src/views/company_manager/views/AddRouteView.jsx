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
import { ManagerRoutes } from "../../../routes/all_user.routes.js";
import validator from "../../../validation/validation.js";
import DropdownOption from "../../../components/common/DropdownOption.jsx";
import UserController from "../controllers/user.controller.js";

const AddTransportAgent = () => {

    // Alert
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const hideSuccessDialog = () => { setShowSuccessDialog(false); navigate(ManagerRoutes.dashboard); }

    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const hideErrorDialog = () => setShowErrorDialog(false);

    // Create object for use navigator
    const navigate = useNavigate();

    // Dropdown state variables
    let [branches, setBranches] = useState([]);

    useEffect(() => {
        //Fetch all branches to fill dropdown
        async function fetchAllBranches() {
            let response = await UserController.getAllBranches();
            if (response.error) {
                alert(response.error);
            }
            else {
                setBranches(response);
            }
        }

        fetchAllBranches();
    }, []);

    // Validation regex
    let {
        validateNIC,
        validateEmail,
        validateName,
        validateAddress,
        validatePhoneNumber,
    } = validator();


    // Map variable
    const [inputData, setInputData] = useState({
        routeName: "",
        fBranchId: "1",
        sBranchId: "1",
    })

    const[selectedRoutes, setSelectedRoutes] = useState({
        sendingBranch: "",
        receivingBranch: "",
    });

    // Validation data map
    const [validations, setValidations] = useState({
        routeName: false,
    });

    // onChange Form validation
    const validateField = (name, value) => {
        switch (name) {
            case 'routeName':
                return (validateName(value));
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

        const { routeName, fBranchId, sBranchId } = inputData;

        try {
            const res = await UserController.addRoute(routeName, fBranchId, sBranchId );

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
            <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Route Added Successfully!</Alert>
            <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> A route already exist withing these branches </Alert>
            <Row className="justify-content-center">
                <Col className="col-md-8">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-sign-turn-right me-2"> </i>
                            Add a New Route
                        </CardTitle>
                        <CardBody>
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
                                    required = {true}
                                />
                                <FormFeedback>Enter a valid route name</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="fBranchId">Assign First Branch</Label>
                                <Input
                                    id="fBranchId"
                                    name="fBranchId"
                                    type="select"
                                    onChange={onChange}
                                    value={inputData.fBranchId}
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
                                <Label for="sBranchId">Assign Second Branch</Label>
                                <Input
                                    id="sBranchId"
                                    name="sBranchId"
                                    type="select"
                                    onChange={onChange}
                                    value={inputData.sBranchId}
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

                            <Button type="submit" disabled={!isFormValid()} onClick={onSubmit} className="btn mt-4 w-100 pt-2 pb-2 bg-primary border">Add the Route</Button>
                            <Button type="reset" className="btn mt-2 w-100 pt-2 pb-2 bg-danger border">Reset Details</Button>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};


export default AddTransportAgent;

