//* child

const randomNim = (cant) => {
  const randomsNums = {};
  console.log(cant);
  for (let i = 0; i < cant; i++) {
    let random = Math.round(Math.random() * cant);
    if (randomsNums[random]) {
      randomsNums[random] += 1;
    } else {
      randomsNums[random] = 1;
    }
  }
  return randomsNums;
};

process.on("message", (cant) => {
  const calculo = randomNim(cant);
  process.send(calculo);
  console.log("termino anterior");

  //queda verificar como matar al process.child
});
