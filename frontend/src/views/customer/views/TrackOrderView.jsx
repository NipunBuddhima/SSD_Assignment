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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserController from "../controllers/user.controller.js";



const TrackOrderView = () => {

    // Alert
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const hideErrorDialog = () => setShowErrorDialog(false);

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const hideSuccessDialog = () => setShowSuccessDialog(false);


    const navigate = useNavigate();

    const [orderId, setOrderId] = useState(null);

    const checkOrderExistingAndNavigate = async (orderIdPassed) => {

        try {

            console.log("orderIdPassed", orderIdPassed);

            const response = await UserController.checkOrderExistingStatus(orderIdPassed);

            if (response.data == true) {
                navigate(`/client/view-order-details/${orderIdPassed}`);
            }
            else {
                setTimeout(() => {
                    setShowSuccessDialog(false);
                }, 1000);
                setTimeout(() => {
                    setShowErrorDialog(true);
                }, 2000);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (

        <Container>

                <Alert color="success" isOpen={showSuccessDialog} toggle={hideSuccessDialog}> Tracking Order....!</Alert>
                <Alert color="danger" isOpen={showErrorDialog} toggle={hideErrorDialog}> Order Does Not Exist </Alert>
                <Row className="justify-content-center">
                    <Col className="col-md-8">
                        <Card>
                            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                                <i className="bi bi-sign-turn-right me-2"> </i>
                                Track Order
                            </CardTitle>
                            <CardBody>
                                <FormGroup>
                                    <Label for="orderId">Order ID</Label>
                                    <Input
                                        id="orderId"
                                        name="orderId"
                                        placeholder="Enter the order ID"
                                        type="text"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        required={true}
                                    />
                                    <FormFeedback>Enter a valid route name</FormFeedback>
                                </FormGroup>

                                <Button className="btn mt-4 w-100 pt-2 pb-2 bg-primary border" onClick={
                                    () => {
                                        setShowErrorDialog(false);
                                        setShowSuccessDialog(true);
                                        checkOrderExistingAndNavigate(orderId);
                                    }
                                }>Track Order</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

        </Container>


    );
};

export default TrackOrderView;