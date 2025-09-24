import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const DashboardSalesChart = () => {
  const chartoptions = {
    series: [
      {
        name: "Orders",
        data: [0, 31, 40, 28, 51, 42, 109],
      },
      {
        name: "Income",
        data: [0, 11, 32, 45, 32, 34, 52],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thusday",
          "Friday",
          "Saturday",
        ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Sales Report</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Weekly Sales Summery
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default DashboardSalesChart;
