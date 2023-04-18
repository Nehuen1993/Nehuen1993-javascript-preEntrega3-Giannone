let productos = 
[
    {
        id: 10,
        nombre: "Discos de freno",
        clase: "frenos",
        cantidad: 5 ,
        precio: 300,
        img: "./imagenes/discosDeFreno.jpeg"
    },
    {
        id: 11,
        nombre: "Pastilla de freno",
        clase: "frenos",
        cantidad: 5 ,
        precio: 200,
        img: "./imagenes/pastillasDeFrenos.jpg"
    },
    {
        id: 12,
        nombre: "Liquido de freno",
        clase: "frenos",
        cantidad: 5 ,
        precio: 100,
        img: "./imagenes/liquidoDeFreno.jpg"
    
    },
    {
        id: 20,
        nombre: "Amortiguados",
        clase: "suspencion",
        cantidad: 5 ,
        precio: 425,
        img: "./imagenes/amortiguadores.jpg"
    },
    {
        id: 21,
        nombre: "Espirales",
        clase: "suspencion",
        cantidad: 5 ,
        precio: 250,
        img: "./imagenes/espirales.jpg"
    },
    {
        id: 22,
        nombre: "Bieleta",
        clase: "suspencion",
        cantidad: 5 ,
        precio: 175,
        img: "./imagenes/bieleta.jpg"
    },
    {
        id: 30,
        nombre: "Aceite 10w-40",
        clase: "motor",
        cantidad: 5 ,
        precio: 315,
        img: "./imagenes/aceiteMotor.jpg"
    },
    {
        id: 31,
        nombre: "Filtro de aceite",
        clase: "motor",
        cantidad: 5 ,
        precio: 130,
        img: "./imagenes/filtroDeAceite.jpg"
    },
    {
        id: 32,
        nombre: "Filtro de aire",
        clase: "motor",
        cantidad: 5 ,
        precio: 50,
        img: "./imagenes/filtroDeAire.jpg"
    }
]


let productosFiltrados = ""
let carrito = []
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
  mostratrCarrito(carrito)
}

verProductos(productos)

    function verProductos(Productos) {
        let contenedor = document.getElementById("tablaDeProductos")
        contenedor.innerHTML = ""
        Productos.forEach(producto => {
            let tarjetaProducto = document.createElement("div")
             tarjetaProducto.className = "tarjetaProducto"
  
    tarjetaProducto.innerHTML = `
        <h2 class=tituloProducto>${producto.nombre}</h2>
        <div class=imagen style="background-image: url(${producto.img})"></div>
        <p class=textoTarjeta>Clase: ${producto.clase}</p>
        <p class=textoTarjeta>Precio por unidad: $ ${producto.precio}</p>
        <button id=${producto.id}> Agregar al carrito </button>
    `
    contenedor.appendChild(tarjetaProducto)

    let boton = document.getElementById(producto.id)
    boton.onclick = agregar
    })
}

function mostratrCarrito(Productos) {
    let carritoDOM = document.getElementById("carrito")
    carritoDOM.innerHTML = ""
    Productos.forEach(producto => {
        let tarjetacarrito = document.createElement("div")
        tarjetacarrito.className = "tarjetacarrito"
        
    tarjetacarrito.innerHTML += `
        <h2> PRODUCTO:${producto.nombre}</h2>
        <p> CANTIDAD: ${producto.cantidad} </p>
        <p> TOTAL EN EFECTIVO: ${producto.precioEnEfectivo} </p>
        `
    carritoDOM.appendChild(tarjetacarrito)
    
    })
  }

function agregar(e) {
    let productoSelecionado = productos.find(producto => producto.id === Number(e.target.id))
        if (carrito.some(producto => producto.id == productoSelecionado.id)) {
            let pos = carrito.findIndex(producto => producto.id == productoSelecionado.id)  
            carrito[pos].cantidad++
            carrito[pos].precioEnEfectivo = carrito[pos].precio * carrito[pos].cantidad
            carrito[pos].precioEnTarjeta = (carrito[pos].precio * carrito[pos].cantidad)*1.10
    } 
        else {
            carrito.push({
            id: productoSelecionado.id,
            nombre: productoSelecionado.nombre,
            precio: productoSelecionado.precio,
            cantidad: 1,
            precioEnEfectivo: productoSelecionado.precio,
            precioEnTarjeta: productoSelecionado.precio
      })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostratrCarrito(carrito)
}

let boton = document.getElementById("comprar")
boton.onclick = comprar

function comprar() {
    if (carrito.length != 0) {
        localStorage.clear()
        alert("¡Muchas gracias por tu compra!")
        carrito = []
        mostratrCarrito(carrito)
    }
    
}

let buscador = document.getElementById("buscador")
console.log(buscador)

function filtrar(e) {
  let arrayFiltrado = productos.filter(producto => producto.nombre.includes(buscador.value))
  renderizarProductos(arrayFiltrado)
}


/*
let precio = 0
let fin = 0
function tarjeta(c) {
    let precioTarjeta =  c * 1.1
    precio = precioTarjeta
}
    
function efectivo(a, b) {
let precioEfectivo = a * b
precio = precioEfectivo

}
function listaProductos(productos) {
    return productos.map(producto => {return `Nombre: ${producto.nombre} Precio: ${producto.precio} ID: ${producto.id}`}).join("\n")
    
}
let mensaje = `Quedan ${producto.cantidad} unidades`
    if (producto.cantidad < 3) {
        mensaje = "ULTIMAS UNIDADES"
        tarjetaProducto.classList.add("rojo")
    }
    */
   /* while (fin != 9) {
let menu = Number(prompt("Bienvenido! Por favor ingrese el numero de lo que necesite hacer \n 1-Ir de compras \n 2-Ver carrito"))   
 if (menu == 1) {
    let clase = prompt("Por favor ingrese la clase de repusto que necesite \n Frenos \n Suspención \n Motor").toLowerCase()
    let claseFiltrada = productos.filter (producto => producto.clase === clase)
    
    if (claseFiltrada.length == 0) {
       alert("el valor ingresado no es correcto recarga la pagina por favor")
        break
        
    } 
    else {
        let idProducto = Number(prompt("Escriba el ID del producto que desea comprar \n" + listaProductos(claseFiltrada)))         
        let productoSeleccionado = claseFiltrada.find(producto => producto.id === idProducto)
            if (productoSeleccionado){
            carrito.push(productoSeleccionado)
           alert("se agrego el producto selecionado al carrito")
            }
            else {
               alert("el valor ingresado no es correcto recarga la pagina por favor")
                break}
        }
}
else if (menu == 2){
  alert("Los productos de tu carrito son: \n" + listaProductos(carrito))
}
else {
   alert("el valor ingresado no es correcto recarga la pagina por favor")
    break}

fin = prompt("Si queres terminar la compra preciona 9 \n Si queres seguir comprando toca 0" )
    if(fin == 9){
        break
    }
    else if (fin !=0)
    {
       alert("el valor ingresado no es correcto recarga la pagina por favor")
        break
    }   
}
alert("Muchas Gracias!")

*/
