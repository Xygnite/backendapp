"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/v1/products", "ProductController.index");
Route.get("/v1/products/:id", "ProductController.show");

Route.get("/v1/orders", "OrderController.index");
Route.post("/v1/order", "OrderController.store");
