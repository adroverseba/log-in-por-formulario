const router = require("express").Router();

router.get("/", (req, res) => {
  const fork = require("child_process").fork;

  const calculo = fork("routes/calculoRandom.js");
  const cant = req.query.cant || 10000000;

  calculo.send(cant);
  calculo.on("message", (randomsNums) => {
    console.log("calculado");
    res.send(randomsNums);
  });
});

module.exports = router;
