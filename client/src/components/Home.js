import React, { useState, useLayoutEffect } from "react";

const Home = (props) => {
  const [getUserRole, setUserRole] = useState("");

  //Hook for loading and re-loading data
  useLayoutEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_USER_DATA)
    );
    if (currentUser !== null) {
      setUserRole(currentUser.role);
    } else {
      setUserRole("");
    }
    // eslint-disable-next-line
  }, [props.refresh]);

  return (
    <>
      <div className="home">
        <h1>HOME PAGE</h1>
      </div>
      {getUserRole === "" ? (
        <div className="alert alert-primary  offset-5 col-3">
          Kindly log in as a Teacher/Student.
        </div>
      ) : (
        <></>
      )}

      {getUserRole.toLowerCase() === "admin" ? (
        <div className="alert alert-danger offset-3 col-7">
          You are logged in as admin, which part is not implemented yet. Kindly
          log in as a Teacher/Student.
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
