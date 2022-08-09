const Container = require("../services/userServices");
const service = new Container();

const router = require("express").Router();

router.get("/", async (req, res) => {
  const resp = await service.getAll();
  res.status(200).send(resp);
});

router.post("/", async (req, res) => {
  const prod = req.body;
  console.log(prod);

  res.status(200).send(await service.save(prod));
});

module.exports = router;
