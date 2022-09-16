const routerProductos = require("./productRouter");
const routerAuth = require("./auth_session");
const routerUser = require("./userRouter");
const routerInfo = require("./infoRouter");
const routerRandom = require("./randomsRouter");
const routerOrder = require("./orderRouter");

function routerApi(app) {
  app.use("/api/productos-test", routerProductos);
  // app.use(routerProductos);
  app.use(routerAuth);
  app.use("/user", routerUser);
  app.use("/info", routerInfo);
  app.use("/api/randoms", routerRandom);
  app.use("/orders", routerOrder);
}

module.exports = routerApi;
