const express = require("express");
const cors = require("cors");

//IMPORTING ROUTES
const productsRouterApi = require("./routes/products");
const categoriesRouterApi = require("./routes/categories");

function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // ADD YOUR ROUTES
  app.use("/api/products/", productsRouterApi);
  // app.use("/api/categories/", categoriesRouterApi);

  return app;
}

module.exports = createApp;
