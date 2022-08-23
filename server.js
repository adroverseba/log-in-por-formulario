const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const session = require("express-session");

const Mensajes = require("./services/clase-Mensajes");
const { knexMessage } = require("./libs/mariaDB");
const routerApi = require("./routes");
const { login } = require("./middleware/auth");
const passport = require("passport");
const checkAuthentication = require("./middleware/utilMiddleware");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const mensajes = new Mensajes(knexMessage, "mensajes");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
//codificacion
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//configuracion de Router
routerApi(app);

//* NO OLVIDAR DESCOMENTAR LAS LINEAS DE ABAJO
// app.get("/", checkAuthentication, (req, res) => {
//   res.redirect("productos.html");
// });

app.get("/", (req, res) => {
  res.send("Hola holaaaa, Bienvenidos a myApp");
  // res.redirect("productos.html");
});

app.post("/", (req, res) => {
  const { email, password } = req.body;
  req.session.user = { email, password };
  console.log(email);
  res.redirect("/");
});

app.get("/desloguear", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//? PRODUCTOS

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Socket.io
io.on("connection", async (socket) => {
  //? MENSAJES
  // envio todos los mensajes a los conectados
  socket.emit("mensajes", await mensajes.getAll());

  socket.on("new-message", async (data) => {
    await mensajes.save(data);
    io.sockets.emit("mensajes", await mensajes.getAll());
  });
});
/**++++++++++++++++++++++++++++++++++++++++++++++ */
// Server Listen+

const PORT = process.env.PORT || 8081;

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});

connectedServer.on("error", (error) =>
  console.log(`Error en el server:${error}`)
);
