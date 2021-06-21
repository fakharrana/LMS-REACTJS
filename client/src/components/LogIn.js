import React, { useState, useLayoutEffect } from "react";
import { Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./style/login.css";

const LogIn = (props) => {
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");

  const history = useHistory();

  //Hook for loading and re-loading data
  useLayoutEffect(() => {
    const getAccessToken = localStorage.getItem(
      process.env.REACT_APP_ACCESS_TOKEN
    );
    if (getAccessToken !== null) {
      history.push("/");
    } else {
    }
    // eslint-disable-next-line
  }, []);

  //Function for validation on form submit
  const validate = () => {
    if (!getUsername && !getPassword) {
      toast.error("Kindly fill the required details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return false;
    }

    if (!getUsername) {
      toast.error("Username cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return false;
    }

    if (!getPassword) {
      toast.error("Password cannot be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return false;
    }
    return true;
  };

  //Function for logging in
  const logIn = async (e) => {
    e.preventDefault();
    const userData = {
      username: getUsername,
      password: getPassword,
    };

    if (validate()) {
      try {
        await axios
          .post("http://localhost:4000/users/login", userData)
          .then(function (response) {
            localStorage.setItem(
              process.env.REACT_APP_ACCESS_TOKEN,
              response.data.token
            );
            localStorage.setItem(
              process.env.REACT_APP_USER_DATA,
              JSON.stringify(response.data.user)
            );
            console.log(   response.data.user)
            toast.success("Successfully logged in", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
            });
            props.redirectPage();
            history.push("/");
          });
      } catch (err) {
        toast.error("Server Error", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <>
      <div className="login shadow">
        <h3 className="form-header-login">
          <b>Log In</b>
        </h3>
        <Form className="form-login">
          <Form.Row>
            <Form.Group as={Col} controlId="email-id">
              <Form.Label className="label">Email</Form.Label>
              <Form.Control
                className="shadow w-75"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="password-id">
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                className="shadow w-75"
                type="password"
                placeholder="Enter your password "
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
            </Form.Group>
          </Form.Row>
          <Link className="forget-password-login" to="/login">
            Forgot Password?
          </Link>
          <Button
            onClick={(e) => logIn(e)}
            className="btn btn-success button-login shadow"
            type="submit"
          >
            Log In
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LogIn;
