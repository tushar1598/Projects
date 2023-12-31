const Student = require("../models/student");
const Interview = require("../models/interview");

module.exports.Create = function (req, res) {
  return res.render("add_student", {
    title: "Student",
  });
};

module.exports.CreateStudent = function (req, res) {
  Student.findOne({ email: req.body.email }, function (err, student) {
    if (!student) {
      Student.create(
        {
          name: req.body.name,
          email: req.body.email,
          collage: req.body.collage,
          batch: req.body.batch,
          DSA_Score: req.body.DSA_Score,
          React_Score: req.body.React_Score,
          Web_Score: req.body.Web_Score,
          placement_status: req.body.placement_status,
          interviews: req.body.interviews,
        },
        function (err, student) {
          if (err) {
            console.log(err);
            return;
          }
          req.flash("success", "Student Created Successfully!!");
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.Delete = async function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (student) {
      student.remove();
      req.flash("success", "Student Removed Successfully!!");
      return res.redirect("back");
    }
  });
};

module.exports.Update = function (req, res) {
  Student.findById(req.params.id, function (err, student) {
    if (student) {
      return res.render("update", {
        title: "update",
        student: student,
      });
      req.flash("success", "You have successfully updated!!");
    }
  });
};

module.exports.Edit = function (req, res) {
  Student.findByIdAndUpdate(req.params.id, req.body, function (err, student) {
    if (err) {
      console.log(err);
      return;
    }
    return res.redirect("back");
  });
};
