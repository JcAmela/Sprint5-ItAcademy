// DOM //
let reportAcudits = [];
let reportJokes = [];
let boton = document.getElementById("boton")
let respuesta = document.getElementById("respuesta")
let contenido_div = document.getElementById("scores_button")
boton.onclick = chistesItAcademyApi;

// petición a la api de chistes proporcionado por It Academy //
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

//  Pinta el chiste de la api y manda ejecutar la funcion de pintar botones del score unicamente si no estan pintados ya.
function mostrar_chiste(mostrarChiste) {
    respuesta.innerHTML = mostrarChiste

    // esto es para que no me pinte los 3 botones todo el rato que le doy al boton de siguiente
    if (contenido_div.innerHTML.trim() === "") { //trim es para evitar los espacios en blanco, saltos de linea etc...
        pintar_botones();
    }
}

//  Pinta los botones del score ademas de asignarle el valor del boton clicado al evento onclic
function pintar_botones() {
    contenido_div.innerHTML =
        `<button id="like" class="col-3"><i class="fas fa-smile fa-2x"></i></button>
        <button id="igual" class="col-3"><i class="fas fa-meh fa-2x"></i></button>
        <button id="dissLike" class="col-3"><i class="fas fa-frown fa-2x"></i></button>`

    document.getElementById('like').addEventListener('onclick', () => asignar_score(1));
    document.getElementById('igual').addEventListener('onclick', () => asignar_score(2));
    document.getElementById('dissLike').addEventListener('onclick', () => asignar_score(3));
}



// creo el array de objetos:  reportAcudits que guarda todos los objetos obtenidos por la api
function guardarDatos(datos) {
    reportAcudits.push(datos)
    mostrar_chiste(datos.joke)
}

// se le asigna el score al nuevo objeto y se le sobrescribe el score al anterior, y tambien lo borra
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
function fecha_valoracion() {
    let asignarfecha = reportJokes[reportJokes.length - 1]
    let fechaNueva = new Date().toISOString();
    asignarfecha.date = fechaNueva
    console.log(reportJokes)
    return reportJokes
}
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
apiWeather()
function tiempo(informacion) {
    document.getElementById("tiempo").innerHTML=`Hoy en ${informacion.location.name} hace una temperatura de: ${informacion.current.temp_c}ºC a tiempo real. <br> Según la información proporcionada por: https://rapidapi.com/weatherapi.`
}