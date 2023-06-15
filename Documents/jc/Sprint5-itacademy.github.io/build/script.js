// DOM //

let boton = document.getElementById("boton")
let respuesta = document.getElementById("respuesta")
let reportAcudits = [];
let reportJokes = [];
let contenido_div = document.getElementById("scores_button")
boton.onclick = peticionApi

// async function / petición API //
async function peticionApi() {

    try {
        const API_URL = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'accept': 'application/json'
            }
        })
        let data = await API_URL.json()
        guardarDatos(data)
        mostrar_chiste(data.joke)


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

//  Pinta los botones del score
function pintar_botones() {
    contenido_div.innerHTML =
        `<button id="like" class="col-3" onclick="asignar_score(1)"><i class="fas fa-smile fa-2x"></i></button>
    <button id="igual" class="col-3" onclick="asignar_score(2)"><i class="fas fa-meh fa-2x"></i></button>
    <button id="dissLike" class="col-3" onclick="asignar_score(3)"><i class="fas fa-frown fa-2x"></i></button>`
}


// creo el array de objetos:  reportAcudits que guarda todos los objetos obtenidos por la api
function guardarDatos(datos) {
    reportAcudits.push(datos)
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

async function tiempo() {

    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1716ad5e83mshe375d8644885c4ap1cb1dfjsn1fc47e758fa6',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();

    } catch (error) {
        console.error(error);
    }

}