var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assignmentSchema = new Schema({
  teacherName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  assignmentTitle: {
    type: String,
    required: true,
  },
  assignmentMarks: {
    type: Number,
    required: true,
  },
  assignmentInstructions: {
    type: String,
    required: true,
  },
  referenceMaterial: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: Date,
    required: true,
  },
  addedOn: {
    type: Date,
    default: new Date(),
  },
  submittedAssignments: [
    {
      rollNumber: {
        type: String,
        required: true,
      },
      submittedMaterial: {
        type: String,
        required: true,
      },
      submittedOn: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);
