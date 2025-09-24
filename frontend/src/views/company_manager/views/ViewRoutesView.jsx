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
  
  import ViewRoutesTable from "../components/ViewRoutesTable.js";
  
  const ViewRoutes = () => {
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
                    Routes Manamagement
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  View All Routes
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col lg="3">
              <FormGroup>
                <Input
                  className="pt-2 pb-2"
                  id="routes"
                  name="routes"
                  placeholder="Search Routes..."
                  type="text"
                // value={inputData.district}
                // onChange={onChange}
                // invalid={validations.district}
                // required = {true}
                />
                <FormFeedback>Enter a valid routes</FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="1">
              <Button style={{"margin-top" : "3px"}} color="primary">Search</Button>
            </Col>
          </Row>
        </Form>
  
      <Row>
  
        <Col lg="12">
          <ViewRoutesTable />
        </Col>
   
      </Row>
      </Container>
    );
  };
  
  export default ViewRoutes;
  