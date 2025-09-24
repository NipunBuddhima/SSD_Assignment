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

import ViewClientsTable from "../components/ViewClientsTable";

const ViewClients = () => {
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
                  Order Manamagement
                </a>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                View All Clients
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col lg="3">
            <FormGroup>
              <Input
                className="pt-2 pb-2"
                id="district"
                name="district"
                placeholder="Search Clients..."
                type="text"
              // value={inputData.district}
              // onChange={onChange}
              // invalid={validations.district}
              // required = {true}
              />
              <FormFeedback>Enter a valid district</FormFeedback>
            </FormGroup>
          </Col>
          <Col lg="1">
            <Button style={{"margin-top" : "3px"}} color="primary">Search</Button>
          </Col>
        </Row>
      </Form>

    <Row>

      <Col lg="12">
        <ViewClientsTable />
      </Col>
 
    </Row>
    </Container>
  );
};

export default ViewClients;
