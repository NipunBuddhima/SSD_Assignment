//A simple login ui to check for authentication of jwts and conditional rendering. Test for more

// Import reacstrap componenet to design loginView
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DOMPurify from 'dompurify';

import React, { useState } from "react";
import AxiosController from "../../../controllers/axios.controller";
import useLogin from "../hooks/useLogin.js";
import useCookie from "../../../hooks/useCookies";
import { useNavigate } from "react-router-dom";

import './LoginView.module.css'; // This is not wooooooooooooooooooooooooooooooooooooooooooooooorking, Not importing shiiiiiiit

function LoginView() {

  const navigate = useNavigate();

  // useState hook to store credentials
  let [credentials, setCredentials] = useState({ nic: "", password: "" });
  let [errorMessage, setErrorMessage] = useState("");

  // using login hook
  let [updateRoleId] = useLogin();

  // Create a cookies object
  let [getCookie, setCookie] = useCookie();

  // input change handle function
  function onChange(event) {
    let { name, value } = event.target;
    
    // Sanitize input to prevent XSS
    const sanitizedValue = DOMPurify.sanitize(value.trim());
    
    setCredentials((prevOptions) => ({
      ...prevOptions,
      [name]: sanitizedValue
    }));
  }

  // Input validation
  const validateNIC = (nic) => {
    return /^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(nic);
  };

  // Safe error display
  const displayError = () => {
    if (errorMessage) {
      // Use text content instead of innerHTML
      return <div className="error-message">{DOMPurify.sanitize(errorMessage)}</div>;
    }
  };

  //submit handler. Move axios instance code to a seperate controller if possible for security purpose
  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Validate inputs before submission
    if (!validateNIC(credentials.nic)) {
      setErrorMessage("Invalid NIC format");
      return;
    }
    
    if (!credentials.password || credentials.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    let response = await AxiosController.instance.post(
      "/api/user/login",
      {
        nic_no: credentials.nic,
        password: credentials.password,
      }
    );

    // Conditional rendering/navigating based on role id. Find a better way if possible
    if (response.data.status) {

      // store role id and nic no in a variable
      let role_id = response.data.role_id;
      let nic_no = response.data.nic_no;

      //set cookies - userNIC and user roleID
      setCookie('user-nic', nic_no);
      setCookie('user-role-id', role_id);

      //updating login hook and redirecting
      updateRoleId(role_id);
    }
  };

  return (
    <div className="bg-primary min-vh-100 d-flex align-items-center">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={4}>
            {/* Added custom styles-------------------------------------------------- */}
            <Card style={{ height: '50vh', padding: '20px'}}>
              <CardBody>
                <h3 className="text-center mb-4">Login</h3>
                {displayError()}
                <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <Label for="nic">NIC</Label>
                    <Input
                      type="text"
                      name="nic"
                      id="nic"
                      placeholder="Enter your nic"
                      value={credentials.nic}
                      onChange={onChange}
                      pattern="^[0-9]{9}[vVxX]$|^[0-9]{12}$"
                      maxLength="12"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={onChange}
                      minLength="6"
                      required
                    />
                  </FormGroup>
                  {/* Added custom margin -----------------------------------------------------------------*/}
                  <Button style={{ marginTop : '40px'}} color="primary" block>Login</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    //    <div classNameNameNameName={styles.main_cont}>
    //   <form classNameNameNameName={styles.form_cont} onSubmit={onSubmit}>
    //     <label>
    //       NIC:
    //       <input
    //         name="nic"
    //         type="text"
    //         value={credentials.nic}
    //         onChange={onChange}
    //       />
    //     </label>
    //     <label>
    //       Password:
    //       <input
    //         name="password"
    //         type="password"
    //         value={credentials.password}
    //         onChange={onChange}
    //       />
    //     </label>
    //     <input type="submit" value="Submit" style={{ width: "100px" }} />
    //   </form>
    // </div>
  );
}


export default LoginView;
