
import { Button, Col, Container, Row, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import UserController from "../controllers/user.controller.js";
import useCookie from "../../../hooks/useCookies.js";
import { useState, useEffect } from "react";

const ViewMyRouteView = () => {

  const [tableData, setTableData] = useState([]);
  const [getCookies] = useCookie();


  // get the branches assigned to the transport agent
  const getBranches = async () => {
    try {
      const nic = getCookies("user-nic");
      const response = await UserController.getBranchesByTransportAgentNic(nic)
    
      setTableData(response);
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    getBranches();
  }, []);

  return (
    <Container>
      <Col>
        <Col lg="4">
        <Card color="success">
            <CardBody>
              <CardTitle className="mb-3" tag="h5"><i className="bi bi-house">{"  "}</i>First Branch</CardTitle>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">You assigned to this branch</small>
                  <h3 className="mb-2 font-weight-bold">{tableData.firstBranch}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

      </Col>

      <Col>
        <Col lg="4">
        <Card color="danger">
            <CardBody>
              <CardTitle className="mb-3" tag="h5"><i className="bi bi-house">{"  "}</i>Second Branch</CardTitle>
              <div className="d-flex">
                <div className="ms-3">
                  <small className="text-muted">You assigned to this branch</small>
                  <h3 className="mb-2 font-weight-bold">{tableData.secondBranch}</h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

      </Col>
    </Container>
  );
};

export default ViewMyRouteView;