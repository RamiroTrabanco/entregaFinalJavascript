const productos = []

const precioCarrito = " "

let carrito = []

let total = 0

class Carrito {
    constructor (nombre, valor ,img)
    {
        this.nombre=nombre
        this.valor=valor
        this.img=img
    }
}


class Productos {
    constructor (nombre, valor, stock, id, img){
        this.nombre=nombre
        this.valor=valor
        this.stock=stock
        this.id=id
        this.img=img
    }
}

productos.push(new Productos("Placa de video Geforce 3050 Palit", 70000, 50, 1432, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GV-N3050EAGLE-OC-8GD_800.jpg"))
productos.push(new Productos("Placa de video Geforce 3050 Asus", 75000, 50, 1430, "https://www.tradeinn.com/f/13890/138901635/asus-tarjeta-grafica-nvidia-rtx3050-dual-oc-8gb-gddr6.jpg"))
productos.push(new Productos("Placa de video Geforce 3060 Palit", 90000, 50, 1433, "https://http2.mlstatic.com/D_NQ_NP_971229-MLA45140204265_032021-O.webp"))
productos.push(new Productos("Placa de video Geforce 3070ti GigaByte", 150000, 50, 1600, "https://www.venex.com.ar/products_images/1642701809_1.png"))
productos.push(new Productos("Placa de Video Asrock AMD Radeon RX 6400", 42000, 50, 1603, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90-GA3CZZ-00UANH_800.jpg"))
productos.push(new Productos("Placa de Video Asrock AMD Radeon RX 6500 XT", 50000, 50, 1606, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/90-GA3DZZ-00UANH_800.jpg"))
productos.push(new Productos("Placa de Video AMD Radeon PowerColor Rx 6600", 77000, 50, 1607, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/AXRX-6600-8GBD6-3DH_800.jpg"))
productos.push(new Productos("Placa de Video AMD Radeon Rx 6650 XT", 95000, 50, 1608, "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/GV-R665XTGAMING-OC-8GD_800.jpg"))


function agregarProductosAlDom() {
    let container = document.querySelector(".container");
    productos.forEach( el => {
        let div = document.createElement("div");
        div.className= "card"
        div.innerHTML = `
        <img src=${el.img} id="productoImg" />
        <p class="productoTitulo">${el.nombre}</p>
        <p class="productoPrecio negrita">$ ${el.valor}</p>
        <button id="${el.id}" class="botonComprar">Comprar</button>
        `
    container.append(div)
    })
}

function botonAgregarClickeado(ev) {
    const boton = ev.target
    const producto = boton.closest(".card")
    const productoNombre = producto.querySelector(".productoTitulo").textContent
    const productoPrecio = producto.querySelector(".productoPrecio").textContent.replace("$", " ")
    const productoImg = producto.querySelector("#productoImg").src

    if (carrito === null) {
        carrito = []
        carrito.push(new Carrito(productoNombre, productoPrecio, productoImg))
    }
    else {
        carrito.push(new Carrito(productoNombre, productoPrecio, productoImg))
    }

    agregarProductoAlCarrito(productoNombre , productoPrecio, productoImg)
}

agregarProductosAlDom()

const agregarProductoBoton = document.querySelectorAll(".card")

agregarProductoBoton.forEach(botonAgregarAlCarrito => {
    botonAgregarAlCarrito.addEventListener("click", botonAgregarClickeado)
})


function borrarOculto() {
    let claseOculta = document.querySelectorAll("#oculto")
    claseOculta.forEach(el => {el.removeAttribute("id")})
} 

function agregarProductoAlCarrito(productoNombre , productoPrecio, productoImg){
    const productoEnCarrito = document.querySelector(".carrito")
    const filaCarrito = document.createElement("tr")
    filaCarrito.className = "productoFilaCarrito"
    const contenidoFilaCarrito = `
    <td class="productoNombreCarrito marginTop">${productoNombre}</td> 
    <td class="marginTop precioProductoCarrito">$${productoPrecio}</td>
    <td> <img src="${productoImg}"/> </td>
    <button class="botonCarrito" type="button">X</button>
    `
    borrarOculto()
    filaCarrito.innerHTML = contenidoFilaCarrito
    productoEnCarrito.append(filaCarrito)
    filaCarrito.querySelector("button").addEventListener("click", borrarProductoCarrito)
    guardarCarrito()
    calcularTotal()
    guardarCarrito()
    comprarCarrito()
    limpiarCarrito()
}

function calcularTotal(){
    let total = 0
    const precioCarrito = document.querySelector(".total")

    const carritoProducto = document.querySelectorAll(".productoFilaCarrito")

    carritoProducto.forEach((productoFilaCarrito) => {
        const carritoProducto = productoFilaCarrito.querySelector(".precioProductoCarrito")
        const carritoProductoPrecio = Number(carritoProducto.textContent.replace("$", "")
    )

    total = total + carritoProductoPrecio
    })
    precioCarrito.innerHTML = `Total: $ ${total}
    <button class="botonCarritoComprar" type="button">Comprar</button>
    <button class="vaciarCarrito" type="button">Limpiar</button>`
} 


function borrarProductoCarrito(event) {
    let botonClickeado = event.target
    let botonClickeadoPrueba = botonClickeado.closest(".productoFilaCarrito")
    let botonClickeadoPruebaNombre = botonClickeadoPrueba.querySelector(".productoNombreCarrito").innerHTML
    botonClickeadoPrueba.remove()
    eliminar(botonClickeadoPruebaNombre)
    calcularTotal()
    comprarCarrito()
    limpiarCarrito()
}

function eliminar(param) {
    let item = carrito.find(el => el.nombre === param)
    let index = carrito.indexOf(item)
    carrito.splice(index, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))    
}

function recuperoCarrito() {
    localStorage.carrito != " " ? carrito = JSON.parse(localStorage.getItem("carrito")) : localStorage.carrito = []
    carrito.forEach(el => {agregarProductoAlCarrito(el.nombre, el.valor, el.img)})
}   

function comprarCarrito() {
    let botonCarritoComprar = document.querySelector(".botonCarritoComprar")
    botonCarritoComprar.addEventListener("click", () => {
        Swal.fire({
        title: "Deseas adquirir los productos?",
        text: "Dejanos tu mail:",
        input: "text",
        confirmButtonText: "Si",
        denyButtonText: "No",
        showDenyButton: true,
        showConfirmButton: true,}).then((result) => {
            
            if (result.isConfirmed) {
            Swal.fire(
                'Muchas gracias por tu compra!',
                'Te enviamos un mail, seguí los pasos para continuar',
                'success'
            )
            compraRealizada()    
            }
            
            else if (result.isDenied) {
                Swal.fire(
                'Compra cancelada',
                'Contá con nuestros productos cuando los necesites',
                'error'
                )
            }})
    })
}


function limpiarCarrito() {
    let botonCarritoLimpiar = document.querySelector(".vaciarCarrito")
    botonCarritoLimpiar.addEventListener("click", () => {
        let cardsDelCarrito = document.querySelectorAll(".productoFilaCarrito")
        for (card of cardsDelCarrito){
            if (cardsDelCarrito.length > -1){
                card.remove()
            }
        }
        cardsDelCarrito.remove
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito))
        Swal.fire({
            title: 'El carrito ahora está vacío',
            icon: "warning",
        })
        total = 0
        calcularTotal()
})}

function compraRealizada() {
    let cardsDelCarrito = document.querySelectorAll(".productoFilaCarrito")
        for (card of cardsDelCarrito){
            if (cardsDelCarrito.length > -1){
                card.remove()
            }
        }
    carrito = []
    localStorage.setItem("carrito", JSON.stringify(carrito))
    total = 0
    calcularTotal()
}

if (localStorage.carrito) {recuperoCarrito()}