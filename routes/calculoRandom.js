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
  process.send(randomNim(cant));
});
