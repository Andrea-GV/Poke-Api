const url = 'https://rickandmortyapi.com/api/character'     //'https://rickandmortyapi.com/api/characterpage=2' 

async function cargarDatos(endPoint) {         // para cargar los datos se los pedimos a la url. Las URL de APIS se llaman endpoint
    
    /* la función fetch recibe dos parámetros ( el primero es la URL(endpoint) , el segundo el MÉTODO de conexión que recibe como objeto)
        MÉTODOS de conexión del FETCH
        -> GET ---> obtiene los datos de la BBDD
        -> POST ---> envía los datos no guardados en BBDD para guardarlos
        -> PUT ---> actualiza los datos de la BBDD    (me traigo)
        -> DELETE ---> borrar los datos de la BBDD
        CRUD <---- todas las funciones anteriores forman el CRUD (Create Read Update Delete)


        SIEMPRE QUE LE PEDIMOS a una función dentro de otra AWAIT hay que ponerle a la función original (padre) ASYNC
    
    */
    
    //hacemos la petición para que ejecute la función FETCH y recoja los datos que se obtengan
    const response = await fetch(endPoint, { method: 'GET' })      // le pedimos que recoja los datos
    
    const data = await response.json()  // convertiremos la respuesta en datos --> json()    "descomprimirlo" --> la función se hace al servidor, y tb tardará ==> es otra promesa
    
    console.log(data)
    if (data.results) {
        //pintar muchos character
        const array = data.results
        pintarCharacters(array, sectionCharacters)
    } else {
        //pintar un character
        pintarUnCharacter(data, sectionCharacters)
    }


}

cargarDatos(url)



//cargar TODOS los personajes
// cargarDatos(url)

// carga en concreto UNO (solo el personaje 2)
// cargarDatos(url + '2')

// cargar la 2a página (si es q las hay)
// cargarDatos(url + '?page=' + num)    -->     con la variable num le dirá de donde hasta donde puede ir
// sería igual que decirle directamente qué página es cargarDatos(url + '?page=2')

// si quisiéramos meterle un filtro habría que añadírselo al parámetro  + ' ':
// cargarDatos(url + '?name')


//            ____________________________________________________________________________       //

        /* <article>
            <figure>
                <img src="" alt="">         ESTO SÓLO ES PARA TENER DE REFERENCIA CÓMO QUIERO QUE QUEDE CADA ARTICLE
            </figure>
            <h3>Nombre personaje</h3>
            <p>Status: vivo</p>
        </article>  */

// atrapamos la clase de la sección donde queremos introducir el article

const sectionCharacters = document.querySelector('.characters');

// ahora hacemos la función que pintará una lista de caracteres y un lugar donde pintarlos

        // ESTÁ LA FUNCIÓN COMENTADA PARA VER EL PASO A PASO, PERO LA BUENA ESTÁ MÁS ABAJO

// function pintarCharacters(lista, lugar) {
//     for (let character of lista) {      // creamos el bucle para que pinte cada caja, que contendrá su personaje. Y luego creamos TODOS los elementos que queremos que contenga
//         const article = document.createElement('article')   // <--- con esto CREAMOS el ARTICLE
//         const figure = document.createElement('figure')
//         const img = document.createElement('img')       // el IMG tiene 2 atributos, el SRC y el ALT
//         img.src = character.image       // la img en este caso la cogemos de la documentación de la web
//         img.alt = character.name
//         const h3 = document.createElement('h3')
//         h3.textContent = character.name
//         const p = document.createElement('p')
//         p.textContent = `status: ${character.status}`

//         figure.appendChild(img)     // ahora metemos la imagen dentro del figure
//         article.append(figure, h3, p);  // y le metemos TODO dentro del article

//         lugar.appendChild(article)      // ahora le decimos DÓNDE QUEREMOS QUE PINTE TODA LA CAJA
        
//     }
// }
// pintarCharacters(array, sectionCharacters)     array está arriba del todo (QUÉ PINTAR), sectionChar... tb (DÓNDE PINTAR)
// LA LLAMADA DE LA FUNCIÓN TB ESTÁ ARRIBA

function pintarCharacters(lista, lugar) {      // creamos la función GENÉRICA que al recorrer, pintará X veces los character
    for (let character of lista) {
        pintarUnCharacter(character, lugar)     // y le llamamos a la función de 1 character para que lo coja de referencia y multipliq
    }
}

// metemos TODA la función pintarCharacters DENTRO de otra función para buscar UN UNICO character

function pintarUnCharacter(character, lugar) {
    const article = document.createElement('article'); //<article></article>
    const figure = document.createElement('figure');  //<figure></figure>
    const img = document.createElement('img'); //<img>
    img.src = character.image
    img.alt = character.name
    const h3 = document.createElement('h3');
    h3.textContent = character.name
    const p = document.createElement('p');
    p.textContent = `Estado: ${character.status}`

    figure.appendChild(img)
    article.append(figure, h3, p);

    lugar.appendChild(article)
}
