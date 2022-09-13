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
//importacion mailer
const transporter = require("./libs/mailer");

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

app.get("/", checkAuthentication, (req, res) => {
  res.redirect("productos.html");
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

app.post("/send-email", (req, res) => {
  const { userEmail, cart, nPrecio } = req.body;

  const purchasedProduct = (products) =>
    Object.values(products).map((prod) => {
      return ` <li>${prod.cantidad} ->${prod.title}</li>`;
    });

  let asunto = "Tienda Electronica";
  let mensaje = `
  <h1>Compra realizada con exito</h1>
  <p>Usted a comprado:</p>
  <ul>${purchasedProduct(cart)}</ul> sumando un total de <b>$${nPrecio}</b>.<br>
Muchas gracias por confiar en nosotros.`;

  const mailOptions = {
    from: ' " Hola😊 Tienda Virtual Tecnologia 🦄"<adroverseba.dev@gmail.com>',
    to: userEmail,
    subject: asunto,
    html: mensaje,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }

    console.log(info);
  });

  res.status(200).json(cart);
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
// const PORT = process.argv[2] || 8081;

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
