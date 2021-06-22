import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./style/navbar.css";

const Navbar = (props) => {
  const [refresh, setRefresh] = useState(0);
  const [getLogInStatus, setLogInStatus] = useState("");
  const [getUserRole, setUserRole] = useState("");
  const [getUserName, setUserName] = useState("");

  const history = useHistory();

  //Hook for loading and re-loading data
  useEffect(() => {
    const getstatus = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    const currentUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_USER_DATA)
    );
    setLogInStatus(getstatus);
    if (currentUser !== null) {
      setUserName(currentUser.name);
      setUserRole(currentUser.role);
    } else {
      setUserRole("");
      setUserName("");
    }
  }, [refresh, props.refresh]);

  //Function for logout
  const logOut = async () => {
    localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
    localStorage.removeItem(process.env.REACT_APP_USER_DATA);
    setRefresh(Math.floor(Math.random() * 1000));
    history.push("/login");
  };

  return (
    <div className="navbar">
      <header>
        <h1 className="nav-h1">COMSATS University, Islamabad</h1>
        <h3 className="nav-h3">Learning Management System</h3>
      </header>
      <div className="nav-ul">
        <ul>
          <li>
            {" "}
            <Link to="/">Home</Link>{" "}
          </li>
          {getLogInStatus === null ? (
            <li>
              {" "}
              <Link to="/login">Log in</Link>{" "}
            </li>
          ) : (
            <></>
          )}

          {getUserRole.toLowerCase() === "teacher" ? (
            <li>
              {" "}
              <Link to="/addassignment">Add Assignment</Link>{" "}
            </li>
          ) : (
            <></>
          )}

          {getUserRole.toLowerCase() === "student" ? (
            <li>
              {" "}
              <Link to="/viewassignments">View Assignments</Link>{" "}
            </li>
          ) : (
            <></>
          )}

          {getLogInStatus !== null ? (
            <li>
              {" "}
              <Link onClick={logOut}>Log Out</Link>{" "}
            </li>
          ) : (
            <></>
          )}

          {getLogInStatus !== null ? (
            <li>
              {" "}
              <Link>Welcome Mr. {getUserName}</Link>{" "}
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
