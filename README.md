# 🚀 IT Academy Barcelona Activa - Sprint 5 🚀

¡Bienvenido a mi repositorio! Soy Juan Carlos Amela y este es el quinto sprint del curso de programación de IT Academy Barcelona Activa. Durante este sprint, nos adentramos en el fascinante mundo de las APIs y el manejo de datos utilizando TypeScript.

## 🎯 Objetivo del Proyecto

Este proyecto es un caleidoscopio de la capacidad y versatilidad de las APIs. El software desarrollado combina dos APIs de chistes, icanhazdadjoke y chucknorris.io, intercalando entre ambas. Pero no nos detuvimos allí, el usuario puede asignar una puntuación a los chistes y esta información se almacena en un array, junto con la fecha en que se puntuó. Además, utilizamos la API de Weatherapi para obtener y mostrar la información meteorológica actual.

## 💻 Código 

El código está escrito en TypeScript y es totalmente abierto para revisión y utilización. Si tienes algún feedback o sugerencias de mejora, ¡me encantaría escucharlas!

Aquí te presento un resumen de las principales funciones del programa:

- `chistesItAcademyApi`: Realiza una petición a la API de icanhazdadjoke para obtener un chiste.
- `chuckApi`: Realiza una petición a la API de chucknorris.io para obtener un chiste.
- `mostrar_chiste`: Muestra el chiste obtenido desde la API en el elemento HTML de respuesta.
- `pintar_botones`: Genera el contenido HTML para los botones de puntuación de los chistes y les asigna el respectivo evento onclick.
- `guardarDatos`: Guarda el chiste obtenido de la API en un array.
- `asignar_score`: Asigna una puntuación a un chiste específico. Si el chiste ya tiene una puntuación, esta se sobrescribe con el nuevo valor.
- `fecha_valoracion`: Asigna la fecha actual a la puntuación de un chiste en particular.
- `apiWeather`: Realiza una petición a una API para obtener información sobre el clima actual.
- `tiempo`: Muestra en pantalla la información sobre el clima actual obtenida de la API.
- `intercalar_chistes`: Llama a las funciones `chistesItAcademyApi` y `chuckApi` de forma intercalada.

## 🛠️ Tecnologías utilizadas

- JavaScript
- TypeScript
- HTML/CSS
- APIs Rest

## 🌐 Recursos 

La API de icanhazdadjoke fue proporcionada por IT Academy Barcelona Activa. Las demás APIs fueron encontradas por mí, y he leído y seguido sus respectivas documentaciones para su correcta implementación.

## 🚦 Instrucciones de uso

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio
2. Ejecuta `npm install` para instalar todas las dependencias
3. Ejecuta `npm start` para iniciar el servidor
4. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en acción!

## 📊 Datos y Resultados

Este proyecto me ha permitido entender mejor la utilidad y el potencial de las APIs y cómo integrarlas con TypeScript para desarrollar aplicaciones robustas y dinámicas. Aquí hay una pequeña muestra de los datos que se pueden generar con este proyecto:

- Número total de chistes obtenidos: X
- Puntuación media de los chistes: X
- Número de chistes con una puntuación superior a 8: X
- Ciudad con la temperatura más alta según la API de Weatherapi: X

## 📚 Aprendizajes

El desarrollo de este proyecto me ha permitido aprender sobre:

- La realización de peticiones a APIs externas y el manejo de datos obtenidos.
- La manipulación de datos utilizando JavaScript y TypeScript.
- La creación de un frontend dinámico para mostrar datos en tiempo real.

## 📧 Contacto

Si tienes alguna pregunta, comentario o sugerencia, no dudes en contactarme. ¡Me encantaría conocer tus pensamientos!

