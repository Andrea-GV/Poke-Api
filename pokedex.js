const pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';  

async function cargarPokemons(endPoint) {         // para cargar los datos se los pedimos de la url, y ésta del JSON q contiene
    //hacemos la petición para que ejecute la función FETCH y recoja los datos que se obtengan
    const response = await fetch(endPoint, { method: 'GET' })      // le pedimos que recoja los datos
    const pokeData = await response.json()    // convertiremos la respuesta en datos --> json()
    /* SIEMPRE QUE LE PEDIMOS a una función dentro de otra AWAIT hay que ponerle al padre ASYNC */
    // console.log(pokeData)
    
    if (pokeData.results) {
        //pintar muchos character
        const array = pokeData.results
        pokemonsAll(array, sectionPokemons)
    } else {
        //pintar un character
        pokemonOne(pokeData, sectionPokemons)
    }
}
cargarPokemons(pokeUrl)

//            ____________________________________________________________________________       //

        /* <article>
            <figure>
                <img src="" alt="">         ESTO SÓLO ES PARA TENER DE REFERENCIA CÓMO QUIERO QUE QUEDE CADA ARTICLE
            </figure>
            <h3>Nombre personaje</h3>
            <p>Status: vivo</p>
        </article>  */

// atrapamos la clase de la sección donde queremos introducir el article
const sectionPokemons = document.querySelector('.todos-pokemons');

// ahora hacemos la función que pintará una lista de caracteres y un lugar donde pintarlos

function pokemonsAll(lista, lugar) {      // creamos la función GENÉRICA que al recorrer, pintará X veces los pokemons
    for (let pokemons of lista) {
        pokemonOne(pokemons, lugar)     // y le llamamos a la función de 1 character para que lo coja de referencia y multipliq
    }
}

// metemos TODA la función pintarCharacters DENTRO de otra función para buscar UN UNICO character

async function pokemonOne(pokemon, lugar) {
        // console.log(pokemon.url)
    const pokeUrlIndividual = pokemon.url;
    const pokePoke = await fetch(pokeUrlIndividual);
    const pokePokeData = await pokePoke.json(); // convertiremos la respuesta en datos --> json()
    console.log(pokePokeData)
    const pokemon2 = {
        name: pokePokeData.name,
        image: pokePokeData.sprites.other['official-artwork']['front_default'],   /*  other.official-artwork.front_default   QUIERO PONER SPRITES-OTHER-OFFICIAL-ARTWORK-FRONT_DEFAULT*/
        type: pokePokeData.types.map((type) => type.type.name).join(', '),
        id: pokePokeData.id,
    };
    // console.log(pokemon2)
    // Contenido de los article
    const article = document.createElement('article'); //<article></article>
    const figure = document.createElement('figure');  //<figure></figure>
    const img = document.createElement('img'); //<img>
    const h3 = document.createElement('h3');
    const span = document.createElement('span');
    const p = document.createElement('p');
    const p1 = document.createElement('p');

    // Contenido de cada elemento-article
    img.src = pokemon2.image
    img.alt = pokemon2.name
    h3.textContent = pokemon2.name
    span.textContent = `# ${pokemon2.id}`;
    p.textContent = `Tipo:`;     /*  REVISAR ESTO PARA PONER TIPO TIERRA. AGUA. ETC */
    p1.textContent = pokemon2.type;
   
    // Clases de los elementos-article
    figure.appendChild(img)
    article.append(figure, h3, span, p, p1);

    lugar.appendChild(article)
}
