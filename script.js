 // Lista de palabras y sus respectivas ayudas
let arrayPalabras = [
    //nivel  1
    "Arbol",
    "Red de Area Local",
    //nivel2
"Switch",
    "HTTP",
    "Router",

    ///nivel 3
    "CAPA DE APLICACION",
    "CAPA DE TRANSPORTE",
    "CAPA DE INTERNET",
    "CAPA DE ACCESO A LA RED",
    ///nivel 4/
    " La capa física",
    "La capa de enlace de datos",
    "La capa de red",
    "La capa de transporte",
    "La capa de sesion",
    "La capa de presentacion",
    "La capa de aplicacion"
];

let ayudas = [
    //nivel 1//
"¿Cuáles son las topologías de Red más comunes?",
"¿Qué es una red LAN¿?",
    //nivel 2//
"¿Qué dispositivo se usa para conectar varios dispositivos dentro de una red LAN?",
    "¿Qué protocolo es utilizado para la comunicación en la web?",
    "¿Qué dispositivo conecta redes diferentes?",

///nivel 3//

    "Es la capa más alta y se encarga de la interacción entre las aplicaciones y la red.",
    "Gestiona las conexiones de extremo a extremo y garantiza la entrega confiable de los datos.",
    "Enruta los paquetes de datos a través de la red.",
    "Se encarga de la transmisión física de datos a través de un medio de red, como Ethernet, Wi-Fi o fibra óptica.",
//nivel 4//    
    "Es una de las 7 capas del modelo OSI",
    "Es una de las 7 capas del modelo OSI",
    "Es una de las 7 capas del modelo OSI",
    "Es una de las 7 capas del modelo OSI",
    "Es una de las 7 capas del modelo OSI",
    "Es una de las 7 capas del modelo OSI",
    "Es una de las 7 capas del modelo OSI"




];

// Variables de control
let intentosRestantes = 5;
let posActual;
let arrayPalabraActual = [];
let cantidadACertadas = 0;
let divsPalabraActual = [];
let totalQueDebeAcertar;
let letrasErroneas = []; // Almacenará las letras erróneas

// Función para cargar una nueva palabra
function cargarNuevaPalabra() {
    // Seleccionamos una palabra aleatoria de arrayPalabras
    posActual = Math.floor(Math.random() * arrayPalabras.length);
    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadACertadas = 0;

    // Dividimos la palabra en letras
    arrayPalabraActual = palabra.split('');
    console.log(arrayPalabraActual);

    // Limpiamos las letras visibles y las letras ingresadas
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    // Creamos los divs para cada letra
    for (let i = 0; i < palabra.length; i++) {
        let divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    // Obtenemos todos los divs creados para las letras
    divsPalabraActual = document.getElementsByClassName("letra");

    // Restablecemos los intentos
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    // Limpiamos las letras erróneas
    letrasErroneas = [];
    document.getElementById("letrasIngresadas").innerHTML = letrasErroneas.join("-");

    // Mostramos la ayuda correspondiente
    document.getElementById("ayuda").innerHTML = ayudas[posActual];
}

// Función que maneja el evento de presionar una tecla
document.addEventListener("keydown", event => {
    // Verificamos si la tecla presionada es una letra
    if (isLetter(event.key)) {
        let acerto = false;
        let letraIngresada = event.key.toUpperCase(); // Convertimos la letra ingresada a mayúsculas

        // Comprobamos si la letra ingresada está en la palabra actual
        let letraEncontrada = false;
        for (let i = 0; i < arrayPalabraActual.length; i++) {
            // Comparamos la letra ingresada con la letra correspondiente en la palabra
            if (arrayPalabraActual[i].toUpperCase() === letraIngresada) {
                divsPalabraActual[i].innerHTML = letraIngresada; // Mostramos la letra en la posición correcta
                acerto = true;
                cantidadACertadas++; // Aumentamos el contador de letras acertadas
                letraEncontrada = true;
                divsPalabraActual[i].classList.add("pintar"); // Resaltamos la letra en verde si está correcta
            }
        }

        // Si el jugador acertó una letra
        if (acerto === true) {
            // Si todas las letras han sido acertadas, pintamos la palabra completa de verde
            if (totalQueDebeAcertar === cantidadACertadas) {
                for (let i = 0; i < arrayPalabraActual.length; i++) {
                    divsPalabraActual[i].classList.add("pintar"); // Resaltamos todas las letras acertadas en verde
                }
            }
        } else {
            // Si no acertó, disminuimos los intentos restantes
            intentosRestantes--;
            document.getElementById("intentos").innerHTML = intentosRestantes;

            // Añadimos la letra errónea a la lista y la mostramos
            if (!letrasErroneas.includes(letraIngresada)) {
                letrasErroneas.push(letraIngresada);
                document.getElementById("letrasIngresadas").innerHTML = letrasErroneas.join("-"); // Actualizamos la lista de letras erróneas
            }

            // Si se quedan sin intentos
            if (intentosRestantes === 0) {
                alert("¡Has perdido! La palabra era: " + arrayPalabraActual.join(''));
                // Reinicia la misma palabra
                cargarNuevaPalabra();
            }
        }
    }
});

// Función que verifica si el valor ingresado es una letra
function isLetter(str) {
    return str.length == 1 && str.match(/[a-zA-abcdefghijklmnñÓopqrstuvwxyz]/i); // Acepta letras y caracteres con acentos
}

// Función para iniciar el juego al cargar la página
window.onload = function() {
    cargarNuevaPalabra();
};