const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Razorpay = require("razorpay");

const razorpayInstance = new Razorpay({
    key_id:"rzp_test_9L9Q22m1UJ7UA4",
  key_secret: "YxuydApd0nn3hcL8lvmMnHxK"
});
console.log(razorpayInstance.orders.create)

exports.checkout = async (req, res, next) => {
  try {
    await Order.findOneAndDelete({



      user: req.user._id,
      orderStatus: "unconfirmed",
    });

    const { address } = req.body;

    const cart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: "products.product",
        // select: { review: 0 },
      })
    //   .populate({
    //     path: "coupon",
    //     select: "couponCode discount expirationDate",
    //   });

    const order = new Order({ user: req.user._id, address });

    let grandTotal = 0;

    const orderProducts = cart.products.map((cartProduct) => {
      const total = cartProduct.quantity * cartProduct.product.price;
      grandTotal += total;
      return {
        product: cartProduct.product._id,
        unitPrice: cartProduct.product.price,
        quantity: cartProduct.quantity,
        total,
      };
    });

    order.products = orderProducts;

    if (cart.coupon) {
      order.coupon = cart.coupon._id;
      order.discount = 0.01 * cart.coupon.discount * grandTotal;
    }

    order.grandTotal = grandTotal;
    order.shippingPrice = 100;
    order.amountToBePaid = grandTotal + order.shippingPrice - order.discount;

    await order.save();

    await order.populate([
      { path: "products.product", select: { reviews: 0 } },
      {
        path: "coupon",
        select: "couponCode discount expirationDate",
      },
    ]);

    return res.status(200).json({
      success: true,
      msg: "order created",
      order,
    });
  } catch (error) {
    next(error);
  }
};

exports.placeOrder = async (req, res, next) => {
  console.log(req.user._id)
  try {
    const order = await Order.findOne({
      user: req.user._id,
      orderStatus: "unconfirmed",
    });
console.log(order)
    const amount = order.amountToBePaid;
    console.log(amount)

    const orderOptions = {
      // amount: amount * 10,
      // amount: 
      amount : amount * 10,
      currency: "INR",
    };

    const paymentGatewayOrder = await razorpayInstance.orders.create(
      orderOptions
    );

    order.paymentGatewayOrderId = paymentGatewayOrder.id;
    order.orderStatus = "confirmed";
    await order.save();

    return res.status(200).json({
      msg: "order id ye kr rha h ",
      orderId: paymentGatewayOrder.id,
      amount: amount ,
    });
  } catch (error) {
    next(error);
  }
};


exports.clearorder = async( req, res)=>{
  console.log("qwetyuiop")

  try{
    const result = await Order.deleteMany({user: req.user._id})
console.log(result)
res.status(201).json({data: result,
  message: "done h boss"} )

  }catch(e){
res.status(500).send(e)

  }
}
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
      orderStatus: "confirmed",
    }).populate({
      path: "products.product",
      select: {
        reviews: 0
      }
    }).populate({
      path: "coupon",
      select: "couponCode discount expirationDate"
    });

    return res.status(200).json({
      success: true,
      msg: "orders of user",
      orders
    })
  } catch (error) {
    next(error);
  }
}