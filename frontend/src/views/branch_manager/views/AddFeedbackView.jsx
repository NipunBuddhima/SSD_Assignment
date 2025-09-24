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
import { BranchManagerRoutes } from "../../../routes/all_user.routes.js";
import validator from "../../../validation/validation.js";
import BranchManagerController from "../controllers/user.controller.js";
import useCookie from "../../../hooks/useCookies.js";
import { Rating } from 'react-simple-star-rating'


const AddNewFeedback = () => {

    // Start Rating
    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)

        // other logic
    }
    // Optinal callback functions
    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value, index) => console.log(value, index)

    // Alert
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const hideSuccessDialog = () => { setShowSuccessDialog(false); navigate(BranchManagerRoutes.dashboard); }

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

    // Map variable
    const [inputData, setInputData] = useState({
        nic: "",
        message: "",
    })

    useEffect(() => {
        // get user branch with cookies
        let userNic = getCookie('user-nic');

        // Save previous data and save new data
        setInputData((prev) => {
            return { ...prev, nic: userNic }
        });
    }, []);

    // Validation data map
    const [validations, setValidations] = useState({
        rating: false,
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
            message
        } = inputData;

        try {
            const res = await BranchManagerController.addFeedback(
                nic,
                rating,
                message
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
            <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Feedback Submitted Successfully!</Alert>
            <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Something Went Wrong! </Alert>
            <Row className="justify-content-center">
                <Col className="col-md-8">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                            <i className="bi bi-star me-2"> </i>
                            Add a New Feedback
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
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="rating">Rating</Label><br></br>
                                {/* <Input
                                    id="rating"
                                    name="rating"
                                    type="select"
                                    value={inputData.rating}
                                    onChange={onChange}
                                    required = {true}
                                >
                                    <option value={1}> 1 </option>
                                    <option value={2}> 2 </option>
                                    <option value={3}> 3 </option>
                                    <option value={4}> 4 </option>
                                    <option value={5}> 5 </option>
                                
                                </Input> */}
                                <Rating
                                    onClick={handleRating}
                                    onPointerEnter={onPointerEnter}
                                    onPointerLeave={onPointerLeave}
                                    onPointerMove={onPointerMove}
                                    showTooltip={true}
                                    tooltipArray={['Very Bad', 'Bad', 'Ok', 'Good', 'Very Good']}
                                /* Available Props */
                                />
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
                                    invalid={validations.message}
                                    required={true}
                                />
                                <FormFeedback>Enter a feedback message body</FormFeedback>
                            </FormGroup>



                            <Button type="submit" disabled={!isFormValid()} onClick={onSubmit} className="btn mt-4 w-100 pt-2 pb-2 bg-primary border">Submit the Feedback</Button>
                            <Button type="reset" className="btn mt-2 w-100 pt-2 pb-2 bg-danger border">Reset Details</Button>

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};


export default AddNewFeedback;

