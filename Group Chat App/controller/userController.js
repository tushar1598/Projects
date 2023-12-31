const User = require("../models/user");
const bcrypt = require("bcrypt");
const Group = require("../models/group")
const Member = require("../models/members")
const Message = require("../models/messages");
const Admin = require("../models/admin");

module.exports.SignUP = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_up");
};

module.exports.SignIN = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_in");
};


module.exports.Profile = async function (req, res) {
  let message = await Message.findAll({ where: { userId: req.user.dataValues.id } });
  let member = await Member.findOne({ where: { userId: req.user.dataValues.id } });
  let user = await User.findAll();
  let groups = await Group.findAll({ where: { userId: req.user.dataValues.id } });
  let uGroup = await Member.findAll({ where: { userId: req.user.dataValues.id } })
  let g = await Group.findAll();
  let id = req.query.id;
  if (id) {
    let rMessage = await Message.findAll({ where: { groupId: id } })
    let groupName = await Group.findOne({ where: { id: id } })
    let admin = await Admin.findAll();
    let A = [{ userid: req.user.dataValues.id }];
    if (member) {
      return res.render("profile", {
        groups, user, g, groupName: groupName.dataValues.name, groupId: id, admin, userId: req.user.dataValues.id, message, uGroup, rMessage, A, username: req.user.dataValues.name, id
      })
    }
  }
  return res.render("profile", {
    groups, user, groupId: "", userId: req.user.dataValues.id, message, uGroup, rMessage: "", username: req.user.dataValues.name, id: '', admin: "", g: ""
  })
}

module.exports.CreateUser = async function (req, res) {
  const { name, email, phone, password } = req.body;
  let hash = await bcrypt.hash(password, 10);
  let user = await User.create({
    name,
    email,
    phone,
    password: hash,
  });
  return res.status(201).json({
    message: "user created!!",
    user: user,
  });
};

module.exports.CreateSession = async function (req, res) {
  return res.redirect("/users/profile");
};

module.exports.Destroy = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    return res.redirect("/users/sign-in");
  });
};


module.exports.CreateGroup = async function (req, res) {
  let group = await Group.create({ name: req.body.groupName, userId: req.user.dataValues.id });
  let username = await User.findOne({ where: { id: req.user.dataValues.id } });
  let A = await Admin.create({ admin: username.dataValues.name, userId: req.user.dataValues.id, groupId: group.dataValues.id });

  let admin = await Member.create(
    {
      member: username.dataValues.name,
      groupname: group.dataValues.name,
      userId: req.user.dataValues.id,
      groupId: group.dataValues.id
    });

  return res.status(200).json({
    message: "group created!!",
    group: group,
    admin: admin,
    A: A
  })
}



module.exports.AddMembers = async function (req, res) {
  let userid = req.body.member[0];
  let username = await User.findOne({ where: { id: req.body.member[0] } });
  let groupname = await Group.findOne({ where: { id: req.body.member[5] } })
  let groupid = req.body.member[5];
  let alreadyUser = await Member.findOne({ where: { userId: userid, groupId: groupid } })
  if (!alreadyUser) {
    let member = await Member.create({
      member: username.dataValues.name,
      userId: userid,
      groupId: groupid,
      groupname: groupname.dataValues.name
    })
    return res.status(200).json({
      message: "members added successfully!!",
      member: member,
      flag: true
    })
  } else {
    return res.status(200).json({
      message: "member already added",
      flag: false
    })
  }

}




module.exports.MakeAdmin = async function (req, res) {
  let uv = req.body.value[0];
  let gv = req.body.value[5];
  let name = await User.findOne({ where: { id: uv } });
  let alreadyAdmin = await Admin.findOne({ where: { userId: uv, groupId: gv } })

  if (!alreadyAdmin) {
    let admin = await Admin.create({
      admin: name.dataValues.name,
      userId: uv,
      groupId: gv
    })

    return res.status(200).json({
      message: "This user is admin now!!",
      admin: admin
    })

  } else if (alreadyAdmin) {
    return res.status(200).json({
      message: "This user is already a admin",
    })
  }

}


module.exports.LeaveGroup = async function (req, res) {
  const { group } = req.body;
  let gId = await Group.findOne({ where: { name: group } });
  const { id } = req.user.dataValues
  let M = await Member.destroy({ where: { groupname: group, userId: id } });
  let A = await Admin.destroy({ where: { groupId: gId.dataValues.id, userId: id } });
  return res.status(200).json({
    message: "user left",
    member: M,
    admin: A
  })
}