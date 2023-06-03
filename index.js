// Solicitar nombre
let nombre = prompt("Ingresa tu nombre:");

// Solicitar edad
let edad = prompt("Ingresa tu edad:");
edad = parseInt(edad);

// Solicitar salario
let salario = prompt("Ingresa tu salario:");
salario = parseFloat(salario);

// Calcular impuesto
let impuesto;
let salarioGanancia;

// Segundos para recargar pagina
let segundos = 10;

// Validar edad
if (edad >= 18) {
    console.log(nombre + ", eres mayor de edad.");
} else {
    console.log(nombre + ", eres menor de edad.");
}


switch (true) {
    case (salario >= 506230):
        salarioGanancia = salario * 0.24;
        impuesto = salarioGanancia * 0.35;
        break;
    default:
        impuesto = salario * 0.3;
        break;
}

console.log("Nombre: " + nombre);
console.log("Edad: " + edad);
console.log("Salario: " + salario);
if (salario >= 506230) {
    console.log("Impuesto: " + impuesto + " Se incluyen ganancias.");
}
else {
    console.log("Impuesto: " + impuesto + " No es alcanzado por ganancias.");
}

//Cuenta regresiva para recargar pagina y volver a preguntar

while (segundos > 0) {
    console.log("Cuenta regresiva para recargar: " + segundos);
    segundos--;
    // Esperar 1 segundo
    let ahora = new Date().getTime();
    while (new Date().getTime() < ahora + 1000) { }
}

console.log("¡Recargando la página!");
setTimeout(2000);

// Comando para recargar pagina
location.reload();

cuentaRegresiva();

