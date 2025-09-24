import { Col, Row } from "reactstrap";
import DashboardFeeds from "../components/DashboardFeeds";
import DashboardOrdersTable from "../components/DashboardOrdersTable";
import DashboardTopCards from "../components/DashboardTopCards";
import DashboardSalesChart from "../components/DashboardSalesChart";
import react, { useEffect, useState } from "react";

const Dashboard = () => {


  let [summaryData, setSummaryData] = useState({
    availableOrders: "400",
    receivedOrder: "100",
    tickets: "15",
    feedbacks: "15"
  });

  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <DashboardTopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Available Orders"
            earning={summaryData.availableOrders}
            icon="bi bi-box"
          />
        </Col>
        <Col sm="6" lg="3">
          <DashboardTopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Received Orders"
            earning={summaryData.receivedOrder}
            icon="bi bi-box-seam-fill"
          />
        </Col>
        <Col sm="6" lg="3">
          <DashboardTopCards
            bg="bg-light-info text-info"
            title="Tickets"
            subtitle="New Tickets"
            earning={summaryData.tickets}
            icon="bi bi-chat"
          />
        </Col>
        <Col sm="6" lg="3">
          <DashboardTopCards
            bg="bg-light-warning text-warning"
            title="Feedbacks"
            subtitle="New Feedbacks"
            earning={summaryData.feedbacks}
            icon="bi bi-star"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col lg="4">
          <DashboardFeeds />
        </Col>
        <Col lg="8">
          {/* <DashboardOrdersTable /> */}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
