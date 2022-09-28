let nuevosIngresos = []

let contenidoCardHTML = ""

const infoProductos = document.querySelector(".dataProductos")

const nuevoProductoCard = (contenido) => {
    return `
    <h2 class="tituloIngresos">${contenido.nombre}</h2>
    <div class="dataProductosCards">
    <img class="img" src="${contenido.imagen}">
    <div><h3>Color:</h3> ${contenido.color}</div>
    <div><h3>Sistema operativo:</h3> ${contenido.sistemaOperativo}</div>
    <div><h3>Tipo de CPU:</h3> ${contenido.tipoDeCpu}</div>
    <div><h3>Modelo de CPU:</h3> ${contenido.modeloCpu}</div>
    <div><h3>Modelo de GPU:</h3> ${contenido.modeloGpu}</div>
    <div><h3>Familia del procesador:</h3> ${contenido.familiaDelProcesador}</div>
    </div>`
}

const nuevosProductos = async () => {
    await fetch("dataProductos.json")
    .then((response) => response.json())
    .then((data) => {
        nuevosIngresos = data
        nuevosIngresos.forEach(el => {contenidoCardHTML += nuevoProductoCard(el)
        })
        infoProductos.innerHTML = contenidoCardHTML
    })
    .catch(err => {console.log("Error:", err)})
}

nuevosProductos()