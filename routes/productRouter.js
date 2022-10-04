const Container = require("../services/productServices");
const service = new Container();
const checkAuthentication = require("../middleware/utilMiddleware");

const router = require("express").Router();

//TODO: descomentar la linea de abajo
// router.get("/", checkAuthentication, async (req, res) => {
//* solo para pruebas de rutas
router.get("/", async (req, res) => {
  // res.redirect("../login.html");
  // console.log("prueba");
  const resp = await service.getAll();
  // res.redirect("productos.html");
  res.status(200).send(resp);
});

router.post("/", async (req, res) => {
  const prod = req.body;
  // console.log(prod);
  res.status(200).send(await service.save(prod));
});

module.exports = router;
