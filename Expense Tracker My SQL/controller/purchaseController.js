const Razorpay = require("razorpay");
const Order = require("../models/order");
const User = require("../models/user");
let dotenv = require("dotenv");
dotenv.config();

module.exports.CreateOrder = async (req, res) => {
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  const amount = 2500;
  let order = await razorpayInstance.orders.create({ amount, currency: "INR" });

  let data = await Order.create({
    orderId: order.id,
    paymentId: "coming soon",
    status: "PENDING",
    userId: req.user.dataValues.id,
  });

  if (order) {
    res.status(200).send({
      success: true,
      msg: "Order Created",
      order_id: order.id,
      amount: amount,
      key_id: process.env.RAZORPAY_ID_KEY,
      id: req.user.dataValues.id,
      contact: req.user.dataValues.phone,
      name: req.user.dataValues.name,
      email: req.user.dataValues.email,
      data: data,
    });
  } else {
    res.status(400).send({ success: false, msg: "Something went wrong!" });
  }
};

module.exports.Premium = async function (req, res) {
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });
  const order = await Order.findAll({
    order: [["id", "DESC"]],
    limit: 1,
  });
  if (order[0]) {
    let orderId = order[0].dataValues.orderId;
    let payment = await razorpayInstance.orders.fetchPayments(orderId);
    if (payment.items.length == 0) {
      return res.status(200).json({
        message: "Order created",
        status: "pending",
      });
    }
    let status = payment.items[0].status;
    if (status == "captured") {
      await Order.update(
        { paymentId: payment.items[0].id, status: "success" },
        { where: { id: order[0].dataValues.id } }
      );
      updatePremium(req.user.dataValues.id);
    } else if (status == "failed") {
      await Order.update(
        { paymentId: payment.items[0].id, status: "failed" },
        { where: { id: order[0].dataValues.id } }
      );
    }
  }
};

async function updatePremium(id) {
  let order = await Order.findAll({
    where: { userId: id, status: "success" },
  });

  if (order.length > 0) {
    let user = await User.findOne({ where: { id: id } });
    await User.update(
      { ispremiumuser: "true" },
      { where: { id: user.dataValues.id } }
    );
  }
}

module.exports.PremiumUser = async function (req, res) {
  let order = await Order.findAll({
    where: {
      userId: req.user.dataValues.id,
      status: "success",
    },
  });
  if (order.length > 0) {
    return res.status(200).json({
      message: "you are a premium user",
      premium: true,
    });
  } else {
    return res.status(200).json({
      message: "you are a not premium user",
      premium: false,
    });
  }
};
