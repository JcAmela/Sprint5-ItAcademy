//*** DOM ***//

let boton = document.getElementById("boton")
let respuesta = document.getElementById("respuesta")
let saveObjects = [];
let ranking = [];
boton.onclick = peticionApi
//*** async function / petición API ***//
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
//  Pinta el chiste de la api
function mostrar_chiste(mostrarChiste) {
    respuesta.innerHTML = mostrarChiste
}

// creo el array de objetos: saveObjects que guarda todos los objetos obtenidos por la api
function guardarDatos(datos) {
    saveObjects.push(datos)
}

function asignar_score(clicado) {
    saveObjects.forEach(e => {
        if (e.score === undefined) {
            let i = {...e}
        i.score = clicado
        ranking.push(i)
        console.log(ranking)
        }
    });
}
