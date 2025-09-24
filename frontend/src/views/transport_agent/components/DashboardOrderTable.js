import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, ButtonGroup } from "reactstrap";

const tableData = [
  {
    order_id: "0001",
    receivingBranch: "Ashan Thilochana",
    sendingBranch: "No,122 malabe, Colombo",
    sBranchContactNo:"07853634645",
    rBranchContactNo:"07074735777"
  
  
  },

  {
    order_id: "0001",
    receivingBranch: "Ashan Thilochana",
    sendingBranch: "No,122 malabe, Colombo",
  
  
  },
  {
    order_id: "0001",
    receivingBranch: "Ashan Thilochana",
    sendingBranch: "No,122 malabe, Colombo",
  
  
  },
 
];

const DashboardOrdersTable = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Latest Orders</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of delivery process
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Receiving Branch</th>
                <th>Sending Branch</th>

              
              </tr>
            </thead>

            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.order_id}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.receiver}</td>
                  <td>{tdata.address}</td>
                  <td>{tdata.contactNo}</td>        
                </tr>
              ))}
            </tbody>
            
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardOrdersTable;
