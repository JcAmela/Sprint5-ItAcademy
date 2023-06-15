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

// se le asigna el score al nuevo objeto y se le sobrescribe el score al anterior, y tambien lo borra
function asignar_score(clicado) {
    let ultimo_objeto = saveObjects[saveObjects.length - 1];
    if (ultimo_objeto.score === undefined) {
        let obj = { ...ultimo_objeto }
        obj.score = clicado
        ranking = ranking.filter(o => o.id != obj.id)
        ranking.push(obj)
    }
    console.log(ranking)
}
