import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, ButtonGroup } from "reactstrap";

const tableData = [
  {
    order_id: "0001",
    receiver: "Ashan Thilochana",
    address: "No,122 malabe, Colombo",
    contactNo: "07267874746",
  
  },

  {
    order_id: "0002",
    receiver: "Pabasara Rajapaksha",
    address: "No.56, Galewala",
    contactNo: "07267267443",
  
  },
  {
    order_id: "0003",
    receiver: "Kaushani hettiarachchi",
    address: "No.56, kadana ,ja-ela",
    contactNo: "07855625477",
  
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
                <th>Receiver Name</th>
                <th>Receiver Address</th>
                <th>Receiver Contact Number</th>
              
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
