"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrderSchema extends Schema {
  up() {
    this.create("orders", table => {
      table.increments();
      table
        .integer("product_id", 10)
        .references("products.id")
        .unsigned();
      table.integer("qty", 5);
      table.integer("price", 10);
      table.timestamp("created_at").defaultTo(this.fn.now());
      table.timestamp("updated_at").defaultTo(this.fn.now());
    });
  }

  down() {
    this.drop("orders");
  }
}

module.exports = OrderSchema;
