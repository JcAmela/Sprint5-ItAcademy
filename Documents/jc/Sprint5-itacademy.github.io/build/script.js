//*** DOM ***//

let boton = document.getElementById("boton")
let respuesta = document.getElementById("respuesta")
boton.onclick = peticionApi

//*** async function / petición API ***//
async function peticionApi(){

    try {
        let chiste = await fetch('https://icanhazdadjoke.com/', {
            headers: {
            'accept': 'application/json'
        }
    })
        let data = await chiste.json()
        siguiente_boton(data.joke)
        return data.joke 

    } catch (error) {
        console.log('el error es el: ' + error)
    }
 
}
//  **** FUNCION QUE EJECUTA EL CONTENIDO DE LA API ****
function siguiente_boton(element){
respuesta.innerHTML=element
}