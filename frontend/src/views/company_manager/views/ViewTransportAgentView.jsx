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
  
  import ViewTransportAgentTable from "../components/ViewTransportAgentTable";
  
  const ViewTransportAgent = () => {
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
                    TransportAgent Manamagement
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  View All TransportAgent
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col lg="3">
              <FormGroup>
                <Input
                  className="pt-2 pb-2"
                  id="TransportAgent"
                  name="TransportAgent"
                  placeholder="Search TransportAgent..."
                  type="text"
                // value={inputData.district}
                // onChange={onChange}
                // invalid={validations.district}
                // required = {true}
                />
                <FormFeedback>Enter a valid TransportAgent</FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="1">
              <Button style={{"margin-top" : "3px"}} color="primary">Search</Button>
            </Col>
          </Row>
        </Form>
  
      <Row>
  
        <Col lg="12">
          <ViewTransportAgentTable />
        </Col>
   
      </Row>
      </Container>
    );
  };
  
  export default ViewTransportAgent;
  