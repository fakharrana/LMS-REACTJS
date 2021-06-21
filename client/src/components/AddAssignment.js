import React, { useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style/addassignment.css";

const AddAssignment = () => {
  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentMarks, setAssignmentMarks] = useState(0);
  const [assignmentInstructions, setAssignmentInstructions] = useState("");
  const [referenceMaterial, setReferenceMaterial] = useState("");
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const history = useHistory();

  useLayoutEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_USER_DATA)
    );
    if (currentUser !== null) {
      setTeacherName(currentUser.name);
    } else {
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

  //For form validation
  const validate = () => {
    if (!className) {
      return false;
    }
    if (!courseName) {
      return false;
    }
    if (!assignmentTitle) {
      return false;
    }
    if (!assignmentMarks) {
      return false;
    }
    if (!assignmentInstructions) {
      return false;
    }
    if (!referenceMaterial) {
      return false;
    }
    if (!day) {
      return false;
    }
    if (!month) {
      return false;
    }
    if (!year) {
      return false;
    }
    return true;
  };

  const addAssignment = async (e) => {
    e.preventDefault();

    if (validate()) {
      const assignment = {
        teacherName: teacherName,
        className: className,
        courseName: courseName,
        assignmentTitle: assignmentTitle,
        assignmentMarks: assignmentMarks,
        assignmentInstructions: assignmentInstructions,
        referenceMaterial: referenceMaterial,

        //new Date(Year, Month, Date, Hr, Min, Sec);
        submissionDate: new Date(year, month - 1, day, 23, 59, 59),
      };

      try {
        await authAxios
          .post("/assignments/addassignment", assignment)
          .then(function (response) {
            toast.success(response.data.Success, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
            });
            history.push("/");
          });
      } catch (error) {
        toast.error("Failed to add assignment", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } else {
      toast.error("Kindly fill the required details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div class="container addassignment">
      <div class="row toprow-addassignment">
        <h1>Add Assignment Details</h1>
      </div>

      <form>
        <div class="form-group row rows-addassignment">
          <label for="class" class="col-3 label">
            Class Name
          </label>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              id="class"
              name="class"
              placeholder="Enter Class Name"
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
        </div>

        <div class="form-group row rows-addassignment">
          <label for="course" class="col-3 label">
            Course Name
          </label>
          <div class="col-9">
            <input
              type="test"
              class="form-control"
              id="course"
              name="course"
              placeholder="Enter Course Name"
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
        </div>

        <div class="form-group row rows-addassignment">
          <label for="assignmenttitle" class="col-3 label">
            Assignment Title
          </label>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              id="assignmenttitle"
              name="assignmenttitle"
              placeholder="Enter Assignment Title"
              onChange={(e) => setAssignmentTitle(e.target.value)}
            />
          </div>
        </div>

        <div class="form-group row rows-addassignment">
          <label for="marks" class="col-3 label">
            Assignment Marks
          </label>
          <div class="col-9">
            <input
              type="number"
              class="form-control"
              id="marks"
              name="marks"
              placeholder="Enter Assignment Marks"
              onChange={(e) => setAssignmentMarks(e.target.value)}
            />
          </div>
        </div>

        <div class="form-group row rows-addassignment">
          <label for="instructions" class="col-3 label">
            Assignment Instructions
          </label>
          <div class="col-9">
            <textarea
              class="form-control"
              id="instructions"
              name="instructions"
              rows-addassignment="8"
              placeholder="Enter Assignment Instructions"
              onChange={(e) => setAssignmentInstructions(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div class="form-group row rows-addassignment">
          <label for="referenceMaterial" class="col-3 label">
            Reference Material
          </label>
          <div class="col-9">
            <input
              class="form-control"
              id="referenceMaterial"
              name="referenceMaterial"
              placeholder="Enter Reference Material Link"
              onChange={(e) => setReferenceMaterial(e.target.value)}
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="submissiondate" class="col-3 label">
            Submission Date
          </label>
          <div class="col-3">
            <input
              type="number"
              class="form-control"
              id="day"
              name="day"
              placeholder="Day (00)"
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div class="col-3">
            <input
              type="number"
              class="form-control"
              id="month"
              name="month"
              placeholder="Month (00)"
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div class="col-3">
            <input
              type="number"
              class="form-control"
              id="year"
              name="year"
              placeholder="Year (0000)"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div class="form-group row rows-addassignment">
          <div class="offset-10 col-2">
            <button
              type="submit"
              class="btn-addassignment btn btn-primary"
              onClick={(e) => addAssignment(e)}
            >
              Add Assignment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAssignment;
