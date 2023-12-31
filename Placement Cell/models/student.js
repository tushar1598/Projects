const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    collage: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },

    DSA_Score: {
      type: Number,
      required: true,
    },
    React_Score: {
      type: Number,
      required: true,
    },
    Web_Score: {
      type: Number,
      required: true,
    },
    placement_status: {
      type: String,
      enum: ["Placed", "Not Placed"],
      required: true,
    },
    interviews: [
      {
        company: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        result: {
          type: String,
          enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
