import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Container, InputGroup } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(
      validateEmail(value) ? "" : "Please enter a valid email address."
    );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(
      validatePassword(value) ? "" : "please enter Valid Password"
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  };

  const validateFields = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email should not be empty");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password should not be empty");
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (!validateFields()) {
      return;
    }

    if (!validateEmail(email)) {
      return;
    }

    if (!validatePassword(password)) {
      return;
    }
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh", backgroundColor: "#f8f9fa" }}
      >
        <Card
          style={{ minWidth: "300px", maxWidth: "500px", width: "100%" }}
          className="rounded shadow p-3 mb-5"
        >
          <Card.Body>
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center h-100">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                <h4 className="text-center mb-4">Welcome</h4>
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Label className="text-dark">
                      Email&nbsp;<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleEmailChange}
                      isInvalid={emailError || (email && !validateEmail(email))}
                    />
                    <Form.Control.Feedback type="invalid">
                      {emailError ? (
                        <span>{emailError}</span>
                      ) : (
                        "Please enter a valid email address."
                      )}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label className="text-dark">
                      Password&nbsp;<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                        isInvalid={
                          passwordError ||
                          (password && !validatePassword(password))
                        }
                      />
                      <InputGroup.Text
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid">
                        {passwordError ? (
                          <span>{passwordError}</span>
                        ) : (
                          "Please enter a valid password."
                        )}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button
                    variant="info custom-button"
                    type="submit"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </div> */}

                  <div class="container mt-3">
                    <div class="row">
                      <div class="col text-center">
                        <Button
                          variant="info custom-button shadow"
                          type="submit"
                          onClick={handleSignIn}
                        >
                          Sign In
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
