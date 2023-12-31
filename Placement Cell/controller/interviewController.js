const Student = require("../models/student");
const Interview = require("../models/interview");

module.exports.Create = function (req, res) {
  return res.render("add_interview", {
    title: "Interview",
  });
};

module.exports.CreateInterview = function (req, res) {
  Interview.create(
    {
      company: req.body.company,
      date: req.body.date,
      students: req.body.students,
    },
    function (err, interview) {
      if (err) {
        console.log(err);
        return;
      }
      req.flash("success", "Company Created Successfully!!");
      return res.redirect("back");
    }
  );
};

module.exports.Result = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id);
    const { email, result } = req.body;

    if (interview) {
      let student = await Student.findOne({ email: email });
      if (student) {
        // check if already enrolled
        let alreadyEnrolled = await Interview.findOne({
          "students.student": student.id,
        });

        // preventing student from enrolling in same company more than once
        if (alreadyEnrolled) {
          if (alreadyEnrolled.company === interview.company) {
            req.flash(
              "error",
              `${student.name} already enrolled in ${interview.company} interview!`
            );
            return res.redirect("back");
          }
        }

        let studentObj = {
          student: student.id,
          result: result,
        };

        // updating students field of interview by putting reference of newly enrolled student
        await interview.updateOne({
          $push: { students: studentObj },
        });

        // updating interview of student
        let assignedInterview = {
          company: interview.company,
          date: interview.date,
          result: result,
        };

        await student.updateOne({
          $push: { interviews: assignedInterview },
        });

        console.log(
          "success",
          `${student.name} enrolled in ${interview.company} interview!`
        );
        return res.redirect("back");
      }
      return res.redirect("back");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("error", "Error in enrolling interview!");
  }
};
