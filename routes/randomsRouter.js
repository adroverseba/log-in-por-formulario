const router = require("express").Router();
const fork = require("child_process").fork;

router.get("/", (req, res) => {
  const calculo = fork("routes/calculoRandom.js");
  const cant = req.query.cant || 10000000;

  calculo.send(cant);
  calculo.on("message", (randomsNums) => {
    console.log("calculando");
    res.send(randomsNums);
  });
});

module.exports = router;
