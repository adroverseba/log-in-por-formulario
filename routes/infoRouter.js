const router = require("express").Router();

router.get("/", (req, res) => {
  let projectFile = process.argv[1].split("\\");

  let info = {
    argumentoEntrada: process.argv.slice(2),
    os: process.platform,
    versionNode: process.version,
    RSS: process.resourceUsage().maxRSS,
    pathEjecucion: process.argv[1],
    processId: process.pid,
    carpetaProyecto: projectFile[projectFile.length - 2],
  };
  // console.log('consologueo de la info para test de carga: ');
  // console.log(info);
  res.send(info);
});

module.exports = router;
