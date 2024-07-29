import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  if (!orders) {
    throw new NotFoundError("order list not found");
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "orders list", orderList: orders });
};

// create order
export const createOrder = async (req, res) => {
  // const orderItemsIds = Promise.all(
  //   req.body.orderItems.map(async (orderItem) => {
  //     let newOrderItem = new OrderItem({
  //       quantity: orderItem.quantity,
  //       product: orderItem.product,
  //     });
  //     newOrderItem = await newOrderItem.save();
      
  //     //  console.log("newOrderItem id", newOrderItem._id);
  //     //  console.log("orderItem product", orderItem.product);
  //     //  console.log("newOrderItem", newOrderItem);
  //     return newOrderItem._id;
      
  //   })
  // );
 
  // const orderItemsIdsResolved = await orderItemsIds;


  let order = new Order({
    // orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  })
    const ordered = await Order.create(req.body);
    console.log(ordered);

  if(!order)
    throw new NotFoundError('the order cannot be created')

  res.status(StatusCodes.CREATED).json({order});
};