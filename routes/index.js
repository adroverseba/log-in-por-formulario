const routerProductos = require("./productRouter");
// const routerAuth = require("./auth_session");
// const routerUser = require("./auth_session");

function routerApi(app) {
  app.use("/api/productos-test", routerProductos);
  // app.use(routerProductos);
  // app.use(routerAuth);
  // app.use("/user", routerUser);
}

module.exports = routerApi;
