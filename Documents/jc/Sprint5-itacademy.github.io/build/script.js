//*** DOM ***//

let boton = document.getElementById("boton")
let respuesta = document.getElementById("respuesta")
boton.onclick = peticionApi
let arrayDeChistes = []
let rank =[]
let saveObjects=[];
let arrayScores=[];
//*** async function / petición API ***//
async function peticionApi(){

    try {
        let chiste = await fetch('https://icanhazdadjoke.com/', {
            headers: {
            'accept': 'application/json'
        }
    })
        let data = await chiste.json()
        mostrar_chiste(data.joke)
        guardarDatos(data)

        return data.joke 

    } catch (error) {
        console.log('el error es el: ' + error)
    }
 
}
//  **** funcion que pinta el chiste de la api ****
function mostrar_chiste(mostrarChiste){
respuesta.innerHTML=mostrarChiste
}

// guardar toda la informacion de la api en el array de objetos: saveObjects
function guardarDatos(datos){
    saveObjects.push(datos)
    console.log('informacion de la api completa y guardada' + saveObjects)
}

// funcion que asigna los score clicado y enseña el array con  //
function mostrar_score(clicado){
    let ranking = [...saveObjects]
    arrayScores = ranking.map(e =>{
        e.score = clicado
        rank.push(e)
        console.log(rank)
    })
    
}