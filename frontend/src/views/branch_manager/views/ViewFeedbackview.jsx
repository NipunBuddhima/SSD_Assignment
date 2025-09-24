import {
    Row,
    Col,
    Container,
    Form,
    Breadcrumb,
    BreadcrumbItem,
    FormGroup,
    Input,
    FormFeedback,
    Button
  } from "reactstrap";
  
  
import ViewTicketTable from "../components/ViewTicketTable";
import ViewFeedbackTable from "../components/ViewFeedbackTable";
  
  const ViewFeedback = () => {
    return (
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
                    Quality Manamagement
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  View All Feedback
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col lg="3">
              <FormGroup>
                <Input
                  className="pt-2 pb-2"
                  id="ticket"
                  name="ticket"
                  placeholder="Search Tickets..."
                  type="text"
                />
                <FormFeedback>Enter a valid Feedbacks</FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="1">
              <Button style={{"margin-top" : "3px"}} color="primary">Search</Button>
            </Col>
          </Row>
        </Form>
  
      <Row>
  
        <Col lg="12">
          <ViewFeedbackTable/>
        </Col>
   
      </Row>
      </Container>
    );
  };
  
  export default ViewFeedback;
  