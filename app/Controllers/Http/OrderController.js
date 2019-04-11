"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Order = use("App/Models/Order");
const Database = use("Database");
/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const orders = await Order.all();
    if (orders.length !== 0) {
      response.json({
        message: "import success!",
        data: orders
      });
    } else {
      response.json({
        message: "import success!",
        data: []
      });
    }
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { product_id, qty, price, addOrChange } = request.post();

    const order = new Order();
    const state = await Order.query()
      .where("product_id", product_id)
      .fetch();
    const check = await Order.findBy("product_id", product_id);
    if (state.rows.length !== 0 && addOrChange == "add") {
      check.merge({ qty: check.qty + qty });
      await check.save();
      response.json({
        messages: "update success!"
      });
    } else if (state.rows.length !== 0 && addOrChange == "change") {
      check.merge({ qty: parseInt(qty) });
      await check.save();
      response.json({
        messages: "update success!"
      });
    } else {
      order.product_id = product_id;
      order.qty = qty;
      order.price = price;
      await order.save();
      response.json({
        messages: "create success!"
      });
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const order = await Order.find(id);
    await order.delete();
    response.json({
      messages: "delete success!"
    });
  }
}

module.exports = OrderController;
