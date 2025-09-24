import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, ButtonGroup, Modal, Input, ModalBody, Form, ModalHeader, FormGroup, Label, FormFeedback, ModalFooter } from "reactstrap";
import React , { useEffect, useState } from "react";
import UserController from "../controllers/user.controller";
import useCookie from "../../../hooks/useCookies.js";

const ViewTicketTable = () => {

  // create state variables for tickets
  const [tickets, setTickets] = useState([]);
  // cookies functions
  let [getCookie, setCookie] = useCookie();
  // create state variables for modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({
    ticketId: "",
    clientNic: "",
    reason: "",
    message: "",
    responseStatus: "",
    responseMessage: ""
  });

  // handle ticket reply change
  const handleTicketReplyChange = (e) => {
    setSelectedTicket({...selectedTicket, responseMessage: e.target.value});
  }

  // update ticket reply
  const updateTicketReply = async () => {
    try {
      const response = await UserController.updateTicketReply(selectedTicket.ticketId, selectedTicket.responseMessage);
      console.log(response.data);
      fetchTickets();

    } catch (error) {
      console.error("Error: ", error);
    }
  }

  // toggle edit modal
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  // close ticket
  const closeTicket = async (ticketId) => {

    try {
      const response = await UserController.ticketStatusUpdate(ticketId, 3);
      console.log("close res", response.data);
      fetchTickets();
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  // delete ticket
  const deleteTicket = async (ticketId) => {
    try {
      const response = await UserController.deleteTicket(ticketId);
      console.log(response.data);
      fetchTickets();
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  // fetch tickets from the backend
  const fetchTickets = async () => {
    try {
      const userNic = getCookie("user-nic");
      const response = await UserController.getAllTicketsByUserNic(userNic);
      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  // fetch tickets when component is mounted
  useEffect(() => {
    fetchTickets();
  }
  ,[]);


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Tickets List</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Tickets belongs to the branch
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                
                <th>Ticket ID</th>
                <th>Client NIC</th>
                <th>Reason</th>
                <th>Message</th>
                <th className="text-center">responseStatus</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((tdata, index) => (
                <tr key={index} className="border-top">
                 
                  <td>{tdata.ticketId}</td>
                  <td>{tdata.clientNic}</td>
                  <td>{tdata.reason}</td>  
                  <td>{tdata.message}</td> 
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {tdata.responseStatus === "Open" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-danger text-white d-inline-block">
                          Open
                        </span>
                      ) : tdata.responseStatus === "Active" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-warning text-white d-inline-block">
                          Active
                        </span>
                      ) : tdata.responseStatus === "Closed" ? (
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-success text-white d-inline-block">
                          Closed
                        </span>
                      ) :(
                        <span className="ps-3 pe-3 pt-1 pb-1 rounded-5 bg-black text-white d-inline-block">
                          No responseStatus
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="d-flex justify-content-center">
                    <Button  className="btn me-2" color="primary" size="sm"
                    onClick={() =>{
                      setSelectedTicket(tdata);
                      toggleEditModal();
                    }}>View</Button>
                    <Button  className="btn" color="danger" size="sm" onClick={() => {
                      closeTicket(tdata.ticketId);
                    }}>Close</Button>
                  </td>             
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

     {/* View Ticket Modal */}
     <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>View Ticket</ModalHeader>
        <ModalBody>
          
          <p><b>Ticket ID:</b> {selectedTicket.ticketId}</p>
          <p><b>Client NIC:</b> {selectedTicket.clientNic}</p>
          <p><b>Reason: </b>{selectedTicket.reason}</p>
          <p><b>Response Status:</b> {selectedTicket.responseStatus}</p>
          <p><b>Ticket Message: </b>{selectedTicket.message}</p>
          <FormGroup>
            <p><b>Response Message</b></p>
            <Input readOnly type="textarea" name="responseMessage" id="responseMessage" placeholder="No Message Yet" value={selectedTicket.responseMessage} onChange={handleTicketReplyChange}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => {
            deleteTicket(selectedTicket.ticketId);
            toggleEditModal();
            }
          }>Delete</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default ViewTicketTable;
