var express = require("express");
var router = express.Router();
var Student = require("../models/student");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//add new student
router.post("/addstudent", function (req, res, next) {
  Student.create(
    {
      name: req.body.name,
      rollno: req.body.rollno,
    },
    function (error, student) {
      if (error) {
        return res.json({ Error: error });
      }
      return res.json({ Success: "Successfully Added" });
    }
  );
});

module.exports = router;
