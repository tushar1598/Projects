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
    user: req.user._id,
  });

  if (order) {
    res.status(200).send({
      success: true,
      msg: "Order Created",
      order_id: order.id,
      amount: amount,
      key_id: process.env.RAZORPAY_ID_KEY,
      id: req.user._id,
      contact: req.user.phone,
      name: req.user.name,
      email: req.user.email,
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
  const ord = await Order.find({});
  let order = ord[ord.length - 1]
  if (order) {
    let orderId = order.orderId;
    let payment = await razorpayInstance.orders.fetchPayments(orderId);
    if (payment.items.length == 0) {
      return res.status(200).json({
        message: "Order created",
        status: "pending",
      });
    }
    let status = payment.items[0].status;
    if (status == "captured") {
      await Order.findByIdAndUpdate(order._id, { paymentId: payment.items[0].id, status: "success" })
      updatePremium(req.user._id);
    } else if (status == "failed") {
      await Order.findByIdAndUpdate(order._id, { paymentId: payment.items[0].id, status: "failed" })
    }
  }
};

async function updatePremium(id) {
  let order = await Order.find({ user: id, status: "success" });
  if (order.length > 0) {
    await User.findByIdAndUpdate(id, { ispremiumuser: "true" });
  }
}

module.exports.PremiumUser = async function (req, res) {
  let order = await Order.find({ user: req.user._id, status: "success" });
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
