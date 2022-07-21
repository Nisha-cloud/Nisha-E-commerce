const Order = require("../models/ordermodel");
const Cart = require("../models/cartmodel");
const crypto = require("crypto");
console.log(process.env.key_id);
console.log(process.env.key_secret);

exports.rzrpaywebhook = async (req, res) => {
  try {
    console.log("webhook");
    console.log(req.body.event);
    const webhookPayloadJson = JSON.stringify(req.body);
    const receivedRazorpaySignature = req.headers["x-razorpay-signature"];
    console.log(req.headers);

    const calculatedSignature = crypto
      .createHmac("sha256", process.env.rzrpay_webhook_scrt)
      .update(webhookPayloadJson)
      .digest("hex");

    if (receivedRazorpaySignature !== calculatedSignature) {
      console.log("hmac signature does not matches");
      console.log(receivedRazorpaySignature);
      console.log(calculatedSignature);
      return res.sendStatus(400);
    }

    const webhookPayload = req.body;

    switch (webhookPayload.event) {
      case "order.paid":
        await updateOrderStatus(webhookPayload.payload.order.entity.id, "paid");
        break;
      case "payment.failed":
        await updateOrderStatus(
          webhookPayload.payload.payment.entity.order_id,
          "failed"
        );
        break;
      default:
        break;
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateOrderStatus = async (razorpayOrderId, status) => {
  try {
    const order = await Order.findOne({ paymentGatewayOrderId: razorpayOrderId });
    order.paymentStatus = status;
    await order.save();

    console.log(status)
    if (status == "paid") {
      await deleteCart(order.user);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteCart = async (userId) => {
  try {
    await Cart.deleteOne({ user: userId });
    await Cart.create({user: userId});
  } catch (error) {
    console.log(error);
    throw error;
  }
};