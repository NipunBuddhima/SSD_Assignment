import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, ButtonGroup } from "reactstrap";

const tableData = [
  {
    order_id: "0001",
    destination_branch: "Polonnaruwa",
    status: "delivered",
    weeks: "35",
    budget: "95K",
  },
  {
    order_id: "0002",
    destination_branch: "Colombo",
    status: "on going",
    weeks: "35",
    budget: "95K",
  },
  {
    order_id: "0003",
    destination_branch: "Kandy",
    status: "received",
    weeks: "35",
    budget: "95K",
  },
];

const DashboardOrdersTable = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Latest Orders</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Overview of new orders
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Destination Branch</th>

                <th>Order Status</th>
                <th className="text-center">Action</th>
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
                  <td>{tdata.destination_branch}</td>
                  <td>
                    {tdata.status === "delivered" ? (
                      <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-success text-white d-inline-block">Delivered</span>
                    ) : tdata.status === "on going" ? ( 
                      <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-warning text-white d-inline-block">On Going</span>
                    ) : tdata.status === "received" ? ( 
                      <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-info text-white d-inline-block">Received</span>
                    ) : (
                      <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">No Status</span>
                    )}
                  </td>
                  <td className="d-flex justify-content-center">
                    <Button  className="btn me-2" outline color="secondary" size="sm">Edit</Button>
                    <Button  className="btn" color="primary" size="sm">View</Button>
                  </td>          
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
