import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, FormFeedback, Label, Input, ModalFooter  } from "reactstrap";
import React, { useEffect, useState } from "react";
import UserController from "../controllers/user.controller";
import { Rating } from 'react-simple-star-rating'
import useCookie from "../../../hooks/useCookies.js";


const ViewFeedbackTable = () => {

  const [feedback, setFeedback] = useState([]);

  const [getCookie, setCookie] = useCookie();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [selectedFeedback, setselectedFeedback] = useState({});
  const [inputData, setInputData] = useState({
    nic: "",
    rating: 0,
    message: "",
  });

  const [validations, setValidations] = useState({
    message: false,
  });

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleRating = (rate) => {
    setInputData({ ...inputData, rating: rate });
  };

  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value, index) => console.log(value, index);

  const deleteFeedback = async (feedbackId) => {
    const res = await UserController.deleteFeedback(feedbackId);
    console.log("res", res);
    fetchData();
  };

  const updateFeedback = async (feedbackId) => {
    const res = await UserController.updateFeedback(feedbackId, inputData);
    console.log("res", res);
    fetchData();
  };


  async function fetchData() {
    const userNic = getCookie("user-nic");
    const res = await UserController.getAllFeedbacksByUserNic(userNic);
    console.log("res", res);
    setFeedback(res);
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
                <th>Action</th>
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
                  <td>
                    <Button className="btn me-2" outline color="secondary" size="sm"
                    onClick={() => {
                      setselectedFeedback(tdata);
                      setInputData({
                        nic: tdata.clientNic,
                        rating: tdata.rating,
                        message: tdata.message,
                      });
                      toggleEditModal();
                    }}>Edit</Button>
                    <Button className="btn" color="danger" size="sm">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Edit Feedback Modal */}
      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Feedback</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for="nic">User NIC</Label>
            <Input
              id="nic"
              name="nic"
              placeholder="Enter transport agent NIC"
              type="text"
              value={inputData.nic}
              onChange={onChange}
              disabled={true}
            />
          </FormGroup>

          <FormGroup>
            <Label for="rating">Rating</Label><br></br>
            <Rating
              initialValue={inputData.rating}
              onClick={handleRating}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              onPointerMove={onPointerMove}
              showTooltip={true}
              tooltipArray={['Very Bad', 'Bad', 'Ok', 'Good', 'Very Good']}
            /* Available Props */
            />
          </FormGroup>

          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              id="message"
              name="message"
              placeholder="Type your problem here.."
              type="textarea"
              value={inputData.message}
              onChange={onChange}
              invalid={validations.message}
              required={true}
            />
            <FormFeedback>Enter a feedback message body</FormFeedback>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={() => {
            updateFeedback(selectedFeedback.feedbackId);
            toggleEditModal();
          }
          }>Update</Button>
          <Button color="danger" onClick={() => {
            deleteFeedback(selectedFeedback.feedbackId);
            toggleEditModal();
          }
          }>Delete</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default ViewFeedbackTable;
