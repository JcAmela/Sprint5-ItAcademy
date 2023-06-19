// DOM //
let reportAcudits = [];
let reportJokes = [];
let boton = document.getElementById("boton")
let respuesta = document.getElementById("respuesta")
let contenido_div = document.getElementById("scores_button")
boton.onclick = chistesItAcademyApi;

// Función asincrónica que se encarga de hacer una petición a la API de chistes proporcionada por It Academy.
async function chistesItAcademyApi() {

    try {
        const API_URL = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'accept': 'application/json'
            }
        })
        let data = await API_URL.json()
        guardarDatos(data)
        return data.joke

    } catch (error) {
        console.log('el error es el: ' + error)
    }

}

// Función encargada de mostrar el chiste obtenido desde la API en el elemento HTML de respuesta. También verifica si los botones de puntuación ya están pintados en la pantalla para no repetirlos.
function mostrar_chiste(mostrarChiste) {
    respuesta.innerHTML = mostrarChiste

    // esto es para que no me pinte los 3 botones todo el rato que le doy al boton de siguiente
    if (contenido_div.innerHTML.trim() === "") { //trim es para evitar los espacios en blanco, saltos de linea etc...
        pintar_botones();
    }
}

// Función que se encarga de generar el contenido HTML para los botones de puntuación de los chistes y asignarles el respectivo evento onclick.
function pintar_botones() {
    contenido_div.innerHTML =
        `<button id="like" class="col-3" onclick="asignar_score(1)" ><i class="fas fa-smile fa-2x"></i></button>
        <button id="igual" class="col-3" onclick="asignar_score(2)" ><i class="fas fa-meh fa-2x"></i></button>
        <button id="dissLike" class="col-3" onclick="asignar_score(3)" ><i class="fas fa-frown fa-2x"></i></button>`
}

// Función encargada de guardar el chiste obtenido de la API en un array, además de invocar la función para mostrar este chiste en pantalla.
function guardarDatos(datos) {
    reportAcudits.push(datos)
    mostrar_chiste(datos.joke)
}

// Función que se encarga de asignar una puntuación a un chiste específico. Si el chiste ya tiene una puntuación, esta se sobrescribe con el nuevo valor.
function asignar_score(clicado) {
    let ultimo_objeto = reportAcudits[reportAcudits.length - 1];
    if (ultimo_objeto.score === undefined) {
        let obj = { ...ultimo_objeto }
        obj.score = clicado
        reportJokes = reportJokes.filter(o => o.id != obj.id)
        reportJokes.push(obj)
    }
    fecha_valoracion()
}

// Función que se encarga de asignar la fecha actual a la puntuación de un chiste en particular. Luego imprime en consola el array de chistes puntuados.
function fecha_valoracion() {
    let asignarfecha = reportJokes[reportJokes.length - 1]
    let fechaNueva = new Date().toISOString();
    asignarfecha.date = fechaNueva
    console.log(reportJokes)
    return reportJokes
}

// Función asincrónica que se encarga de hacer una petición a una API para obtener información sobre el clima actual.
async function apiWeather() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=84.123.164.93';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1716ad5e83mshe375d8644885c4ap1cb1dfjsn1fc47e758fa6',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        tiempo(result);
    } catch (error) {
        console.error(error);
    }
}

// Función que se encarga de mostrar en pantalla la información sobre el clima actual obtenida de la API.
apiWeather()
function tiempo(informacion) {
    document.getElementById("tiempo").innerHTML=`Hoy en ${informacion.location.name} hace una temperatura de: ${informacion.current.temp_c}ºC a tiempo real. <br> Según la información proporcionada por: https://rapidapi.com/weatherapi.`
}