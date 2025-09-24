import { Col, Row } from "reactstrap";
import DashboardFeeds from "../components/DashboardFeeds";
import DashboardOrdersTable from "../components/DashboardOrdersTable";
import DashboardTopCards from "../components/DashboardTopCards";
import DashboardSalesChart from "../components/DashboardSalesChart";
import react, { useEffect, useState } from "react";
import useCookie from "../../../hooks/useCookies";
import UserController from "../controllers/user.controller";


const Dashboard = () => {

  // Create coockie object to store
  let [getCookie, setCookie] = useCookie();

  let [summaryData, setSummaryData] = useState({
    availableOrders: "400",
    receivedOrder: "100",
    tickets: "15",
    feedbacks: "15"
  });

  // Get branchId with user nic and save as a cookie
  useEffect(() => {

    // async function getBranchId() {
    //   let userNIC = getCookie('user-nic');
    //   let data = await UserController.getBranchIdByBranchManagerNIC(userNIC);
    //   if (data.error) {
    //     alert(data.error);
    //   }
    //   else {
    //     console.log(data);
    //     let branchId = data.branchId;
    //     setCookie('user-branch-id', branchId);
    //   }
    // }

    // getBranchId();

  }, []);

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
        <Col sm="6" lg="6" xl="7" xxl="8">
          {/* <DashboardSalesChart /> */}
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          {/* <DashboardFeeds /> */}
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          {/* <DashboardOrdersTable /> */}
        </Col>
      </Row>
      {/***Blog Cards***/}
      {/* <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row> */}
    </div>
  );
};

export default Dashboard;
