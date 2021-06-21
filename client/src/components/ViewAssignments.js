import React, { useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style/viewassignments.css";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useLayoutEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_USER_DATA)
    );
    if (currentUser !== null) {
      getAssignments();
    }
    // eslint-disable-next-line
  }, []);

  //Axios Instance for Authenticated Requests With JWT Token
  const authAxios = new axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        process.env.REACT_APP_ACCESS_TOKEN
      )}`,
    },
  });

  const pastDue = (date) => {
    var submissionDate = new Date(date);
    var currentDate = new Date();

    if (submissionDate < currentDate) {
      return true;
    }
    return false;
  };

  const getAssignments = async () => {
    try {
      await authAxios.get("/assignments").then(function (response) {
        setAssignments(response.data);
      });
    } catch (error) {
      toast.error("Failed to retrieve assignments", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      {assignments.length !== 0 ? (
        assignments.map((item, index) => (
          <div className="card-viewassignments  shadow">
            <div>
              <span className="title-viewassignments ">
                {item.assignmentTitle}
              </span>
              <br />
              <span>{item.courseName}</span>
              <br />
              {pastDue(item.submissionDate) ? (
                <span className="pastdue-viewassignments">
                  {"Past Due " +
                    item.submissionDate.slice(8, 10) +
                    item.submissionDate.slice(4, 8) +
                    item.submissionDate.slice(0, 4) +
                    "       (11 : 59 PM) "}
                </span>
              ) : (
                <span>
                  {"Due on " +
                    item.submissionDate.slice(8, 10) +
                    item.submissionDate.slice(4, 8) +
                    item.submissionDate.slice(0, 4) +
                    "       (11 : 59 PM) "}
                </span>
              )}
            </div>
            <Link
              to={`/viewassignment/${item._id}`}
              className="btn-viewassignments  btn btn-primary"
            >
              View Assignment
            </Link>
          </div>
        ))
      ) : (
        <div class="card-viewassignments  shadow">
          There is no assignment due.
        </div>
      )}
    </>
  );
};

export default ViewAssignments;
