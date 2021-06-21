var express = require("express");
var router = express.Router();
var Assignment = require("../models/assignment");
var authenticate = require("../authenticate");

//get all assignments
router.get("/", authenticate.verifyUser, function (req, res, next) {
  Assignment.find({}, function (error, assignments) {
    if (error) {
      return res.json({ Error: error });
    }
    return res.json(assignments);
  });
});

//get assignment details
router.get(
  "/assignmentdetails/:id",
  authenticate.verifyUser,
  function (req, res, next) {
    Assignment.find(
      { _id: req.params.id },
      function (error, assignmentDetails) {
        if (error) {
          console.log(req.params.id);
          return res.json({ Error: error });
        }
        console.log(req.params.id);
        return res.json(assignmentDetails);
      }
    );
  }
);

//add new assignment
router.post(
  "/addassignment",
  authenticate.verifyUser,
  function (req, res, next) {
    Assignment.create(
      {
        teacherName: req.body.teacherName,
        className: req.body.className,
        courseName: req.body.courseName,
        assignmentTitle: req.body.assignmentTitle,
        assignmentMarks: req.body.assignmentMarks,
        assignmentInstructions: req.body.assignmentInstructions,
        referenceMaterial: req.body.referenceMaterial,
        submissionDate: req.body.submissionDate,
      },
      function (error, assignment) {
        if (error) {
          return res.json({ Error: error });
        }
        return res.json({ Success: "Successfully Added" });
      }
    );
  }
);

//Submit Assignment
router.put(
  "/submitassignment",
  authenticate.verifyUser,
  function (req, res, next) {
    Assignment.updateOne(
      { _id: req.body.id },
      {
        $push: {
          submittedAssignments: {
            rollNumber: req.body.rollNumber,
            submittedMaterial: req.body.submittedMaterial,
          },
        },
      },
      function (error, assignment) {
        if (error) {
          return res.json({ Error: error });
        }
        return res.json({ Success: "Successfully Submitted" });
      }
    );
  }
);

module.exports = router;
