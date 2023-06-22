// Definición del tipo de los chistes
type Joke = {
    joke: string;
    score?: number;
    date?: string;
};

// DOM //
let reportAcudits: Joke[] = [];
let reportJokes: Joke[] = [];
let respuesta: HTMLElement | null = document.getElementById("respuesta");
let contenido_div: HTMLElement | null = document.getElementById("scores_button");
let contador1: number = 0;
let contador2: number = 0;

// Llama a la API del tiempo al iniciar
apiWeather();

// Función asincrónica que se encarga de hacer una petición a la API de chistes proporcionada por It Academy.
async function chistesItAcademyApi(): Promise<string> {
    try {
        const API_URL: Response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'accept': 'application/json'
            }
        });
        let data = await API_URL.json();
        guardarDatos(data.joke);
        contador1++;
        return data.joke;
    } catch (error) {
        console.log('el error es el: ' + error);
        return "";
    }
}

// Función encargada de mostrar el chiste obtenido desde la API en el elemento HTML de respuesta. También verifica si los botones de puntuación ya están pintados en la pantalla para no repetirlos.
function mostrar_chiste(mostrarChiste: string): void {
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
function pintar_botones(): void {
    if (contenido_div) {
        contenido_div.innerHTML =
            `<button id="like" class="col-3" onclick="asignar_score(1)" ><i class="fas fa-smile fa-2x"></i></button>
            <button id="igual" class="col-3" onclick="asignar_score(2)" ><i class="fas fa-meh fa-2x"></i></button>
            <button id="dissLike" class="col-3" onclick="asignar_score(3)" ><i class="fas fa-frown fa-2x"></i></button>`;
    }
}

// Función encargada de guardar el chiste obtenido de la API en un array, además de invocar la función para mostrar este chiste en pantalla.
function guardarDatos(datos: string): void {
    reportAcudits.push({ joke: datos });
    mostrar_chiste(datos);
}

// Función que se encarga de asignar una puntuación a un chiste específico. Si el chiste ya tiene una puntuación, esta se sobrescribe con el nuevo valor.
function asignar_score(clicado: number): void {
    let ultimo_chiste: Joke = reportAcudits[reportAcudits.length - 1];
    let obj: Joke = { joke: ultimo_chiste.joke, score: clicado };
    reportJokes = reportJokes.filter(o => o.joke != obj.joke);
    reportJokes.push(obj);
    fecha_valoracion();
}

// Función que se encarga de asignar la fecha actual a la puntuación de un chiste en particular. Luego imprime en consola el array de chistes puntuados.
function fecha_valoracion(): Joke[] {
    let asignarfecha: Joke = reportJokes[reportJokes.length - 1];
    let fechaNueva: string = new Date().toISOString();
    asignarfecha.date = fechaNueva;
    console.log(reportJokes);
    return reportJokes;
}

// Función asincrónica que se encarga de hacer una petición a una API para obtener información sobre el clima actual.
async function apiWeather(): Promise<void> {
    const url: string = 'https://weatherapi-com.p.rapidapi.com/current.json?q=84.123.164.93';
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1716ad5e83mshe375d8644885c4ap1cb1dfjsn1fc47e758fa6',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const response: Response = await fetch(url, options);
        const result = await response.json();
        tiempo(result);
    } catch (error) {
        console.error(error);
    }
}

// Función que se encarga de mostrar en pantalla la información sobre el clima actual obtenida de la API.
function tiempo(informacion: any): void {
    if(document.getElementById("tiempo")){
        document.getElementById("tiempo")!.innerHTML = `Hoy en ${informacion.location.name} hace una temperatura de: ${informacion.current.temp_c}ºC a tiempo real. <br> Según la información proporcionada por: https://rapidapi.com/weatherapi.`;
    }
}

async function chuckApi(): Promise<void> {
    const url: string = 'https://api.chucknorris.io/jokes/random';
    const options: RequestInit = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    };

    try {
        const response: Response = await fetch(url, options);
        const result = await response.json();
        guardarDatos(result.value);
        contador2++;
    } catch (error) {
        console.error(error);
    }
}

function intercalar_chistes(): void {
    contador1 <= contador2 ? chistesItAcademyApi() : chuckApi();
}
