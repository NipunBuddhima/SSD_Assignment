import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, ButtonGroup } from "reactstrap";
import user from "../../../assets/images/users/user.jpg";
import React, { useEffect, useState } from "react";
import UserController from "../controllers/user.controller";
import { Rating } from 'react-simple-star-rating'
import useCookie from "../../../hooks/useCookies.js";


const ViewFeedbackTable = () => {

  const [feedback, setFeedback] = useState([]);

  async function fetchData() {
    const res = await UserController.getAllFeedbacks();
    setFeedback(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Feedback List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Feedback belongs to the branch
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>

                <th>Feedback ID</th>
                <th>Client NIC</th>
                <th>Rating</th>
                <th>Message</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {feedback.map((tdata, index) => (
                <tr key={index} className="border-top">

                  <td>{tdata.feedbackId}</td>
                  <td>{tdata.clientNic}</td>

                  <td><Rating
                    initialValue={tdata.rating}
                    readonly={true}
                  /></td>

                  <td>{tdata.message}</td>
                  {/* <td>
                    <Button disabled className="btn me-2" outline color="secondary" size="sm">Edit</Button>
                    <Button disabled className="btn" color="danger" size="sm">Delete</Button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewFeedbackTable;
