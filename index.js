const opcionVerServicios = 1;
const opcionVerCarrito = 2;
const opcionNecesitoFactura = 3;
const opcionSalirPedido = 4;
const opcionSalir = 6;
const iva = 1.21;
let totalDeProducto = 0;
const arrayDeServicios = [];
const arrayCarrito = [];
let idUniversal = 1;

class Servicio {
    constructor(id, nombre, precio, descripcion) {
        this.id = id;
        this.precio = precio;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.productos = [];
    }
}

const servicio1 = new Servicio(
    idUniversal++,
    "Baby Shower",
    2000,
    "Celebra la llegada del bebé con un hermoso Baby Shower temático."
);
arrayDeServicios.push(servicio1);

const servicio2 = new Servicio(
    idUniversal++,
    "Casamientos",
    5000,
    "Organizamos tu boda de ensueño, cuidando cada detalle para que sea inolvidable."
);
arrayDeServicios.push(servicio2);

const servicio3 = new Servicio(
    idUniversal++,
    "Cumpleaños",
    1500,
    "Celebra tu cumpleaños con nosotros y disfruta de una fiesta llena de alegría y diversión."
);
arrayDeServicios.push(servicio3);

const servicio4 = new Servicio(
    idUniversal++,
    "Eventos empresariales",
    3000,
    "Organizamos eventos corporativos que destacan la imagen y los valores de tu empresa."
);
arrayDeServicios.push(servicio4);

const servicio5 = new Servicio(
    idUniversal++,
    "CandyBars",
    1000,
    "Crea una mesa de dulces única para tus eventos y deleita a tus invitados con variedad de opciones."
);
arrayDeServicios.push(servicio5);

const agregarProductoAServicio = (servicio) => {
    const mensajeAMostrar = `Productos disponibles para ${servicio.nombre}:\n1- Cabina fotográfica\n2- Fotos 360 grados\n3- No agregar ningún extra`;
    const opcion = parseInt(prompt(mensajeAMostrar + "\nIngrese el número del producto para agregarlo al servicio"));

    switch (opcion) {
        case 1:
            servicio.productos.push("Cabina fotográfica");
            servicio.precio += 1000;
            break;
        case 2:
            servicio.productos.push("Fotos 360 grados");
            servicio.precio += 1500;
            break;
        case 3:
            break; // No agregar ningún extra, no se hace nada
        default:
            alert("Ingresaste una opción inválida.");
            break;
    }
    alert(`El producto ha sido agregado al servicio ${servicio.nombre}`);
};

const verServicios = () => {
    let opcion;
    do {
        let mensajeAMostrar = "Elige un servicio:\n";
        arrayDeServicios.forEach((servicio) => {
            mensajeAMostrar += `${servicio.id}-${servicio.nombre}\n`;
        });
        mensajeAMostrar += `${opcionSalir}-Salir`;

        opcion = parseInt(prompt(mensajeAMostrar));
        if (opcion !== opcionSalir) {
            const servicioSeleccionado = arrayDeServicios.find((servicio) => servicio.id === opcion);

            if (servicioSeleccionado) {
                alert(`Descripción de ${servicioSeleccionado.nombre}:\n${servicioSeleccionado.descripcion}`);
                agregarProductoAServicio(servicioSeleccionado);
                arrayCarrito.push(servicioSeleccionado);
            } else {
                alert("Ingresaste una opción inválida.");
            }
        }
    } while (opcion !== opcionSalir);
};

const verCarrito = () => {
    let mensajeAMostrar = "Carrito de compras:\n";
    arrayCarrito.forEach((servicio) => {
        mensajeAMostrar += "\n" + "Servicio: " + servicio.nombre + " " + "\nPrecio: " + servicio.precio;
        if (servicio.productos.length > 0) {
            mensajeAMostrar += "\nProductos adicionales:";
            servicio.productos.forEach((producto) => {
                mensajeAMostrar += "\n- " + producto;
            });
        } else {
            mensajeAMostrar += "\nNo se agregaron productos adicionales.";
        }
    });

    const total = arrayCarrito.reduce((acumulador, servicio) => acumulador + servicio.precio, 0);
    mensajeAMostrar += "\nEl total es: $" + total;
    alert(mensajeAMostrar);
};

const necesitoFactura = () => {
    const totalCarrito = arrayCarrito.reduce((acumulador, servicio) => acumulador + servicio.precio, 0);
    const totalConIVA = totalCarrito * iva;
    alert("El total con IVA (21%): $" + totalConIVA.toFixed(2));
};

const realizarPedido = () => {
    verCarrito();
    necesitoFactura();
    alert("¡Gracias por elegir Kirana Eventos, nos contactaremos a la brevedad!");
};

let opcion = parseInt(
    prompt(
        "Elige una opción:\n1-Servicios para agregar al carrito\n2-Ver Carrito de Compras\n3-Subtotal con factura\n4-Salir y realizar pedido"
    )
);

while (opcion !== opcionSalir && opcion !== opcionSalirPedido) {
    switch (opcion) {
        case opcionVerServicios:
            verServicios();
            break;
        case opcionVerCarrito:
            verCarrito();
            break;
        case opcionNecesitoFactura:
            necesitoFactura();
            break;
        default:
            alert("Ingresaste una opción inválida.");
            break;
    }

    opcion = parseInt(
        prompt(
            "Elige una opción:\n1-Servicios para agregar al carrito de compras\n2-Ver Carrito de Compras\n3-Subtotal con factura\n4-Salir y realizar pedido"
        )
    );
}

if (opcion === opcionSalirPedido) {
    realizarPedido();
} else {
    alert("¡Gracias por elegir Kirana Eventos! Vuelve pronto para más servicios y decoraciones.");
}
