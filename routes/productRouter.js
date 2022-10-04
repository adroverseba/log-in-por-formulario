const Container = require("../services/productServices");
const service = new Container();
const checkAuthentication = require("../middleware/utilMiddleware");
const setupModels = require("../ddbb/models");

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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.findOne(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const prod = req.body;
    res.status(201).send(await service.save(prod));
  } catch (error) {
    //
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProd = await service.delete(id);
    res.status(200).json(deleteProd);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
