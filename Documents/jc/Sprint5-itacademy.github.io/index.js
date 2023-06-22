"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// DOM //
let reportAcudits = [];
let reportJokes = [];
let respuesta = document.getElementById("respuesta");
let contenido_div = document.getElementById("scores_button");
let contador1 = 0;
let contador2 = 0;
// Llama a la API del tiempo al iniciar
apiWeather();
// Función asincrónica que se encarga de hacer una petición a la API de chistes proporcionada por It Academy.
function chistesItAcademyApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const API_URL = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'accept': 'application/json'
                }
            });
            let data = yield API_URL.json();
            guardarDatos(data.joke);
            contador1++;
            return data.joke;
        }
        catch (error) {
            console.log('el error es el: ' + error);
            return "";
        }
    });
}
// Función encargada de mostrar el chiste obtenido desde la API en el elemento HTML de respuesta. También verifica si los botones de puntuación ya están pintados en la pantalla para no repetirlos.
function mostrar_chiste(mostrarChiste) {
    if (respuesta) {
        respuesta.innerHTML = mostrarChiste;
    }
    if (contenido_div) {
        if (contenido_div.innerHTML.trim() === "") {
            pintar_botones();
        }
    }
}
// Función que se encarga de generar el contenido HTML para los botones de puntuación de los chistes y asignarles el respectivo evento onclick.
function pintar_botones() {
    if (contenido_div) {
        contenido_div.innerHTML =
            `<button id="like" class="col-3" onclick="asignar_score(1)" ><i class="fas fa-smile fa-2x"></i></button>
            <button id="igual" class="col-3" onclick="asignar_score(2)" ><i class="fas fa-meh fa-2x"></i></button>
            <button id="dissLike" class="col-3" onclick="asignar_score(3)" ><i class="fas fa-frown fa-2x"></i></button>`;
    }
}
// Función encargada de guardar el chiste obtenido de la API en un array, además de invocar la función para mostrar este chiste en pantalla.
function guardarDatos(datos) {
    reportAcudits.push({ joke: datos });
    mostrar_chiste(datos);
}
// Función que se encarga de asignar una puntuación a un chiste específico. Si el chiste ya tiene una puntuación, esta se sobrescribe con el nuevo valor.
function asignar_score(clicado) {
    let ultimo_chiste = reportAcudits[reportAcudits.length - 1];
    let obj = { joke: ultimo_chiste.joke, score: clicado };
    reportJokes = reportJokes.filter(o => o.joke != obj.joke);
    reportJokes.push(obj);
    fecha_valoracion();
}
// Función que se encarga de asignar la fecha actual a la puntuación de un chiste en particular. Luego imprime en consola el array de chistes puntuados.
function fecha_valoracion() {
    let asignarfecha = reportJokes[reportJokes.length - 1];
    let fechaNueva = new Date().toISOString();
    asignarfecha.date = fechaNueva;
    console.log(reportJokes);
    return reportJokes;
}
// Función asincrónica que se encarga de hacer una petición a una API para obtener información sobre el clima actual.
function apiWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=84.123.164.93';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1716ad5e83mshe375d8644885c4ap1cb1dfjsn1fc47e758fa6',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            tiempo(result);
        }
        catch (error) {
            console.error(error);
        }
    });
}
// Función que se encarga de mostrar en pantalla la información sobre el clima actual obtenida de la API.
function tiempo(informacion) {
    if (document.getElementById("tiempo")) {
        document.getElementById("tiempo").innerHTML = `Hoy en ${informacion.location.name} hace una temperatura de: ${informacion.current.temp_c}ºC a tiempo real. <br> Según la información proporcionada por: https://rapidapi.com/weatherapi.`;
    }
}
function chuckApi() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.chucknorris.io/jokes/random';
        const options = {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            guardarDatos(result.value);
            contador2++;
        }
        catch (error) {
            console.error(error);
        }
    });
}
function intercalar_chistes() {
    contador1 <= contador2 ? chistesItAcademyApi() : chuckApi();
}
