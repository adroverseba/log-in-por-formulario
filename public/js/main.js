const socket = io().connect();

// configuro Handlebars y construyo una funcion con async await para traer con la funcion fetch la plantilla de hbs
// const productTable = async (productos) => {
//   const response = await fetch("./views/productos.hbs");
//   const view = await response.text();
//   const template = Handlebars.compile(view); //compila la plantilla
//   const html = template({ product: productos }); //genera el html
//   return html;
// };

const productTable = async (productos) => {
  const response = await fetch("./views/productList.ejs");
  const view = await response.text();
  let html = ejs.render(view, { productos });
  return html;
};

// socket.on("productos", (productos) => {
//   productTable(productos).then((html) => {
//     document.getElementById("productos").innerHTML = html;
//   });
// });
const getProductBtn = document.getElementById("getProducts");
getProductBtn.addEventListener("click", () => {
  // console.log("click");
  fetch("/api/productos-test")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return productTable(data);
    })
    .then((html) => {
      document.getElementById("productos").innerHTML = html;
    });
});

const ingresoProducto = document.querySelector("#ingresarProducto");

ingresoProducto.addEventListener("submit", async (e) => {
  e.preventDefault();
  // const producto = {
  //   title: ingresoProducto.children.nombre.value,
  //   price: ingresoProducto.children.precio.value,
  //   thumbnail: ingresoProducto.children.foto.value,
  // };
  let options = {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      title: ingresoProducto.children.nombre.value,
      price: ingresoProducto.children.precio.value,
      thumbnail: ingresoProducto.children.foto.value,
    }),
  };
  const resp = await fetch("/api/productos-test", options);

  // console.log(producto);
  // socket.emit("agregarProducto", producto);
  ingresoProducto.reset();
});

// +++++++++++++++++++++++++
const chat = document.getElementById("enviarMensaje");

chat.addEventListener("submit", (e) => {
  e.preventDefault();
  const mensaje = {
    userName: document.querySelector("#usuario").value,
    date: new Date().toLocaleString(),
    message: document.querySelector("#mensaje").value,
  };
  socket.emit("new-message", mensaje);
  document.querySelector("#mensaje").value = "";
  console.log(mensaje);
});

// creo funcion de renderizado
const render = function (data) {
  const output = document.getElementById("output");
  console.log(data);
  if (data) {
    let html = data
      .map((elem) => {
        return `<p>
    <span class="text-primary"><strong>${elem.userName}</strong>:</span>
    <span id="message-date" style="color:brown" >[${elem.date}]</span>
    <span class="text-success"> <em>${elem.message}</em></span>
    </p>`;
      })
      .join(" ");
    output.innerHTML = html;
    window.scrollTo(0, document.body.scrollHeight);
    output.scrollTo(0, document.body.scrollHeight);
  } else {
    output.innerHTML = `<h4>No hay mensajes</h4>`;
  }
};

//escucho los mensajes del servidor
socket.on("mensajes", (data) => {
  render(data);
});
