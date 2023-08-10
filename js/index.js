let carrito = [];
let totalCarrito = 0;

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    totalCarrito = parseFloat(localStorage.getItem("totalCarrito")) || 0;
}

function verCarrito() {
    let carritoContenido = document.getElementById("carrito-lista").innerHTML;
    alert("Contenido del pedido:\n\n" + carritoContenido);
}

function mostrarCarrito() {
    let carritoContainer = document.getElementById("carrito-container");
    carritoContainer.classList.remove("hidden");
    actualizarCarrito();
}

function cerrarCarrito() {
    let carritoContainer = document.getElementById("carrito-container");
    carritoContainer.classList.add("hidden");
}

function agregarAlCarrito(producto, precio, imagen) {
    carrito.push({ producto: producto, precio: precio, imagen: imagen });
    totalCarrito += precio;
    console.log("Producto agregado al pedido: " + producto);
    console.log("Contenido del pedido: " + JSON.stringify(carrito));
    actualizarCarrito();
    guardarEnLocalStorage();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'AGREGADO AL PEDIDO',
        showConfirmButton: false,
        timer: 1500
    })
}

function removerDelCarrito(index) {
    let productoRemovido = carrito[index];
    totalCarrito -= productoRemovido.precio;
    carrito.splice(index, 1);
    console.log("Producto removido del carrito: " + index);
    console.log("Contenido del pedido: " + JSON.stringify(carrito));
    actualizarCarrito();
    guardarEnLocalStorage();
}

function realizarPedido() {
    document.body.innerHTML =
        `<header>
        <div>
        <h1><a class="titulo" href="index.html">KIRANA eventos</a></h1>
        </div>
    </header>

    <section id="formulario-pedido">
        <h2 style="text-align:center; margin-top:20px">Finalizar Pedido</h2>
        <div id="formulario-container">
            <form onsubmit="finalizarPedido(event)">
                <label for="nombre">Nombre y apellido:</label>
                <input type="text" id="nombre" placeholder="Franco Marquetti" required><br>
                <label for="numero-tarjeta">Numero de Tarjeta credito/debito:</label>
                <input type="text" id="numero-tarjeta" placeholder="1234 5678 9123 4567" required><br>
                <label for="fecha-vencimiento">Fecha de caducidad:</label>
                <input type="text" id="fecha-vencimiento" placeholder="12/12" required><br>
                <label for="cvv">Codigo:</label>
                <input type="text" id="cvv" placeholder="123" required><br>
                <button type="submit">Aceptar pedido</button>
            </form>
        </div>
    </section>
    <footer>
            <div>
                <h2><a class="titulo" href="index.html">¡Gracias por realizar el pedido!</a></h2>
            </div>
            <div>
                <p>Proyecto Realizado por:</p>
                <p>Franco Marquetti</p>
            </div>
        </footer>`;


}

function hacerPedido(nombre, numeroTarjeta, fechaVencimiento, cvv) {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Error',
            text: 'No hay ningun pedido en proceso. Agrega algo al carrito.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    const pedido = {
        nombre: nombre,
        numeroTarjeta: numeroTarjeta,
        fechaVencimiento: fechaVencimiento,
        cvv: cvv,
        carrito: carrito
    };
    Swal.fire({
        title: 'Pedido',
        html: `
            <strong>Nombre:</strong> ${pedido.nombre}<br>
            <strong>Número de Tarjeta:</strong> ${pedido.numeroTarjeta}<br>
            <strong>Fecha de Vencimiento:</strong> ${pedido.fechaVencimiento}<br>
            <strong>CVV:</strong> ${pedido.cvv}<br>
            <strong>Contenido del Carrito:</strong><br>
            ${mostrarContenidoCarrito(pedido.carrito)}
        `,
        icon: 'info',
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'PEDIDO FINALIZADO',
                showConfirmButton: false,
                timer: 1500
            });
            carrito = [];
            totalCarrito = 0;
            actualizarCarrito();
            guardarEnLocalStorage();
        }
    });
}

function mostrarContenidoCarrito(carrito) {
    let contenidoCarrito = '';
    if (carrito.length === 0) {
        contenidoCarrito = 'El carrito esta vacio.';
    } else {
        carrito.forEach((producto, index) => {
            contenidoCarrito += `${index + 1}. ${producto.producto} - Precio: $${producto.precio.toFixed(2)}<br>`;
        });
    }
    return contenidoCarrito;
}

function actualizarCarrito() {
    let carritoLista = document.getElementById("carrito-lista");
    let carritoCantidad = document.getElementById("carrito-cantidad");
    let totalCarritoElement = document.getElementById("total-carrito");
    carritoLista.innerHTML = "";
    carritoCantidad.textContent = carrito.length;
    totalCarritoElement.textContent = "$" + totalCarrito.toFixed(2);
    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i].producto;
        let precio = carrito[i].precio;
        let imagen = carrito[i].imagen;
        let li = document.createElement("li");
        li.textContent = producto + " - Precio: $" + precio.toFixed(2);
        let imagenElement = document.createElement("img");
        imagenElement.src = imagen;
        imagenElement.alt = "Imagen " + (i + 1);
        li.appendChild(imagenElement);
        let botonRemover = document.createElement("button");
        botonRemover.textContent = "Remover";
        botonRemover.onclick = (function (index) {
            return function () {
                removerDelCarrito(index);
            };
        })(i);
        li.appendChild(botonRemover);
        carritoLista.appendChild(li);
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalCarrito", totalCarrito.toString)
}