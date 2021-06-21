import React, { useState, useLayoutEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./style/viewassignment.css";

const ViewAssignment = () => {
  const [assignment, setAssignment] = useState([]);
  const [submissionMaterial, setSubmissionMaterial] = useState("");
  const [studentRollNumber, setStudentRollNumber] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");

  const history = useHistory();
  const params = useParams();
  const assignmentid = params.id;

  useLayoutEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_USER_DATA)
    );
    if (currentUser !== null) {
      setStudentRollNumber(currentUser.username);
      getAssignmentDetails();
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

  //Function for slicing date
  const sliceDate = (date) => {
    const slicedDate = date.slice(8, 10) + date.slice(4, 8) + date.slice(0, 4);
    return slicedDate;
  };

  //To get details of a specific assignment
  const getAssignmentDetails = async () => {
    try {
      await authAxios
        .get(`/assignments/assignmentdetails/${assignmentid}`)
        .then(function (response) {
          setAssignment(response.data[0]);
          setSubmissionDate(
            sliceDate(response.data[0].submissionDate) + "       (11 : 59 PM) "
          );
        });
    } catch (error) {
      toast.error("Failed to retrieve assignment details", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  //To validate submission link
  const validate = () => {
    if (!submissionMaterial) {
      return false;
    }
    return true;
  };

  //To submit assignment
  const submitAssignment = async (e) => {
    e.preventDefault();

    var submissionData = {
      id: assignment._id,
      rollNumber: studentRollNumber,
      submittedMaterial: submissionMaterial,
    };

    if (validate()) {
      try {
        await authAxios
          .put("assignments/submitassignment", submissionData)
          .then(function (response) {
            toast.success(response.data.Success, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
            });
            history.push("/");
          });
      } catch (error) {
        toast.error("Failed to submit assignment", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } else {
      toast.error("Kindly Provide Your Submission Link", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div>
      <div className="container viewassignment">
        <div className="row toprow-viewassignment">
          <div className="col">
            <h1>Assignment Details</h1>
          </div>
        </div>

        <form>
          <div className="row rows-viewassignment">
            <div className="form-group col">
              <label for="course" className="label">
                Course Name
              </label>
              <input
                type="test"
                className="form-control"
                id="course"
                name="course"
                value={assignment.className}
                disabled
              />
            </div>

            <div className="form-group col">
              <label for="teachername" className="label">
                Teacher Name
              </label>
              <input
                type="text"
                className="form-control"
                id="teachername"
                name="teachername"
                value={assignment.teacherName}
                disabled
              />
            </div>
          </div>

          <div className="row rows-viewassignment">
            <div className="form-group col">
              <label for="assignmenttitle" className="label">
                Assignment Title
              </label>
              <input
                type="text"
                className="form-control"
                id="assignmenttitle"
                name="assignmenttitle"
                value={assignment.assignmentTitle}
                disabled
              />
            </div>

            <div className="form-group col">
              <label for="marks" className="label">
                Assignment Marks
              </label>
              <input
                type="number"
                className="form-control"
                id="marks"
                name="marks"
                value={assignment.assignmentMarks}
                disabled
              />
            </div>
          </div>

          <div className="row rows-viewassignment">
            <div className="form-group col">
              <label for="instructions" className="label">
                Assignment Instructions
              </label>
              <textarea
                className="form-control"
                id="instructions"
                name="instructions"
                rows-viewassignment="8"
                value={assignment.assignmentInstructions}
                disabled
              ></textarea>
            </div>
          </div>

          <div className="row rows-viewassignment">
            <div className="form-group col">
              <label for="referenceMaterial" className="label">
                Reference Material
              </label>
              <input
                className="form-control"
                id="referenceMaterial"
                name="referenceMaterial"
                value={assignment.referenceMaterial}
                disabled
              />
            </div>

            <div className="form-group col">
              <label for="submissiondate" className="label">
                Submission Date
              </label>
              <input
                type="text"
                className="form-control"
                id="submissiondate"
                name="submissiondate"
                value={submissionDate}
                disabled
              />
            </div>
          </div>

          <div className="row rows-viewassignment">
            <div className="form-group col">
              <label for="submissionMaterial" className="label">
                Your Work
              </label>
              <input
                type="text"
                className="form-control"
                id="submissionMaterial"
                name="submissionMaterial"
                placeholder="Paste Your Submission Link Here"
                onChange={(e) => setSubmissionMaterial(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row rows-viewassignment">
            {pastDue(assignment.submissionDate) ? (
              <>
                <div className="alert alert-danger col-9">
                  Past Due Date, please contact your teacher for submission.
                </div>
                <div className="offset-1 col-2">
                  <button
                    disabled
                    type="submit"
                    className="btn-viewassignment btn btn-primary"
                  >
                    Submit Assignment
                  </button>
                </div>
              </>
            ) : (
              <div className="offset-10 col-2">
                <button
                  type="submit"
                  className="btn-viewassignment btn btn-primary"
                  onClick={(e) => submitAssignment(e)}
                >
                  Submit Assignment
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewAssignment;
