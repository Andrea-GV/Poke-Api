const pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';  

// quiero que aparezca una imagen sobre el logo cuando le haga hover
const logoImg = document.getElementById('logo');
const logoImg2 = document.getElementById('logo2');      // atrapo ambas img

logoImg.addEventListener('mouseover', function() {      // aplico el listener
    logoImg2.style.display = 'block'; 
});
logoImg.addEventListener('mouseout', function() {
    logoImg2.style.display = 'none'; // Restaurar la imagen original (logo1.png)
});

// Crear el NAV - LI - Filtro tipos y recoger los tipos. Pintar tantos como haya
const divContenedorNav = document.querySelector('#contenedor');
const navPokemons = document.querySelector('.nav-pokemons');

async function navTiposPokemon() {
    const apiUrl = 'https://pokeapi.co/api/v2/type';        // de dónde coge los tipos
    const response = await fetch(apiUrl);
    const navData = await response.json();
    const types = navData.results.map(result => result.name);   // para que devuelva los tipos en array

    const nav = document.createElement('nav');
    nav.classList.add('nav-pokemons');
    const ul = document.createElement('ul');

    types.forEach(type => {
        const li = document.createElement('li');
        li.textContent = type;
        li.classList.add('tipo-' + type); // Añade clase específica para cada tipo
        li.addEventListener('click', () => {
            filtrarPokemonsPorTipo(type);
        })
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    divContenedorNav.insertBefore(nav, navPokemons);

    types.forEach(type => {
        const style = document.createElement('style');      // crea estilos para cada tipo de pokemon ((En qué momento me meto en este fregao))
        style.textContent = `.tipo-${type}{
        }`;
        document.head.appendChild(style);
    })
}

const allPokemons = []; // creo el array vacío para luego meter los pokemons

async function cargarPokemons(endPoint) {         // para cargar los datos se los pedimos de la url, y ésta del JSON q contiene
    //hacemos la petición para que ejecute la función FETCH y recoja los datos que se obtengan
    const response = await fetch(endPoint, { method: 'GET' })      // le pedimos que recoja los datos
    const pokeData = await response.json()    // convertiremos la respuesta en datos --> json()
    /* SIEMPRE QUE LE PEDIMOS a una función dentro de otra AWAIT hay que ponerle al padre ASYNC */
    // console.log(pokeData)
    
    if (pokeData.results) {
        //pintar muchos character
        const array = pokeData.results;
        pokemonsAll(array, sectionPokemons)
        allPokemons.push(...array); // así añade el pokemon con filtro al array de allPokemons 
    } else {
        //pintar un character
        pokemonOne(pokeData, sectionPokemons);
        allPokemons.push(pokeData);
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
const divContenedorPokes = document.querySelector('#contenedor');
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
    // console.log(pokePokeData)

    const types = pokePokeData.types.map(typeObj => typeObj.type.name); // para separar en arrays distintos los tipos de pokemon
    // console.log(types);

    // ahora quiero asignar los tipos en función de cuántos tenga (1 ó 2)
    let type1, type2;
    if (types.length >= 1) {
        type1 = types[0];
    }
    if (types.length >= 2) {
        type2 = types[1];
    }

    const pokemon2 = {
        name: pokePokeData.name,
        image: pokePokeData.sprites.other['official-artwork']['front_default'],   /*  other.official-artwork.front_default   QUIERO PONER SPRITES-OTHER-OFFICIAL-ARTWORK-FRONT_DEFAULT*/
        // type: pokePokeData.types.map((type) => type.type.name).join(', '), ESTE ES EL Q FUNCIONA EN 1
        // type1: types[0],    <---- hace el primer tipo
        // type2: types[1],    <---- 2o tipo PERO NO MANTIENE EL CONDICIONAL
        type1: type1 || "",
        type2: type2 || "",

        id: pokePokeData.id,
    };
    // const pokemonType1: pokePokeData.types.map(type => `${type.type.name}`,  `${type.type.name}`),
    // const pokemonTtype2: pokePokeData.types.map((type) => type.type.name).join(', '),
    // console.log(pokemon2.type1)

    // Contenido de los article
    const article = document.createElement('article'); //<article></article>
    const figure = document.createElement('figure');  //<figure></figure>
    const img = document.createElement('img'); //<img>
    const h3 = document.createElement('h3');
    const span = document.createElement('span');
    const p = document.createElement('p');
    const p1 = document.createElement('p');

    // para que aplique los estilos de los distintos tipos de pokemon (tipo-flying...)
    p.classList.add('tipo-' + pokemon2.type1.toLowerCase()); // Agregar clase del primer tipo
    if (pokemon2.type2) {
        p1.classList.add('tipo-' + pokemon2.type2.toLowerCase()); // Agregar clase del segundo tipo
    }
    // Contenido de cada elemento-article
    img.src = pokemon2.image
    img.alt = pokemon2.name
    h3.textContent = pokemon2.name
    span.textContent = `# ${pokemon2.id}`;
    // p.textContent = pokemon2.type1;     /*  ESTE ERA EL BUENO */
    // p1.textContent = pokemon2.type2;
    p.textContent = pokemon2.type1;     /*  el primer tipo sí aparece. ETC */
    if(pokemon2.type2) {                /*  No todos tienen un segundo, por eso el IF   */
        p1.textContent = pokemon2.type2;
        // console.log(pokemon2.type)
    }
    // Clases de los elementos-article
    img.classList.add("imgPokemon");
    h3.classList.add("h3Pokemon");
    span.classList.add("spanPokemon")
    p.classList.add("pPokemon")
    p1.classList.add("p1Pokemon")

    // crear los hijos
    figure.appendChild(img)
    article.append(figure, h3, span, p, p1);

    lugar.appendChild(article)
}


// ahora es cuando quiero que haga la función de filtro entre el navPokemon y sección todos-pokemons

async function filtrarPokemonsPorTipo(type) {
    const apiUrl = `https://pokeapi.co/api/v2/type/${type}`;
    const response = await fetch(apiUrl);
    const typeData = await response.json();

    const pokemonUrls = typeData.pokemon.map(pokemon => pokemon.pokemon.url);

    const pokemonDataPromises = pokemonUrls.map(url => fetch(url).then(response => response.json()));
    const pokemonDataArray = await Promise.all(pokemonDataPromises);

    const filteredPokemons = pokemonDataArray.filter(pokemonData => {       // aquí le aplico el filtro de búsqueda del nav al section
        const types = pokemonData.types.map(typeObj => typeObj.type.name);
        return types.includes(type);
    });

    sectionPokemons.innerHTML = ''; // reseteo del filtro

    filteredPokemons.forEach(pokemon => {       // muestra los pokemon filtrados en "todos-pokemon"
        // pokemonOne(pokemonData, sectionPokemons);
       const types = pokemon.types.map(typeObj => typeObj.type.name); // para separar en arrays distintos los tipos de pokemon
    // console.log(types);

    // ahora quiero asignar los tipos en función de cuántos tenga (1 ó 2)
    let type1, type2;
    if (types.length >= 1) {
        type1 = types[0];
    }
    if (types.length >= 2) {
        type2 = types[1];
    }

    const pokemon2 = {
        name: pokemon.name,
        image: pokemon.sprites.other['official-artwork']['front_default'],   /*  other.official-artwork.front_default   QUIERO PONER SPRITES-OTHER-OFFICIAL-ARTWORK-FRONT_DEFAULT*/
        // type: pokePokeData.types.map((type) => type.type.name).join(', '), ESTE ES EL Q FUNCIONA EN 1
        // type1: types[0],    <---- hace el primer tipo
        // type2: types[1],    <---- 2o tipo PERO NO MANTIENE EL CONDICIONAL
        type1: type1 || "",
        type2: type2 || "",

        id: pokemon.id,
    };
    // const pokemonType1: pokePokeData.types.map(type => `${type.type.name}`,  `${type.type.name}`),
    // const pokemonTtype2: pokePokeData.types.map((type) => type.type.name).join(', '),
    // console.log(pokemon2.type1)

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
    // p.textContent = pokemon2.type1;     /*  ESTE ERA EL BUENO */
    // p1.textContent = pokemon2.type2;
    p.textContent = pokemon2.type1;     /*  el primer tipo sí aparece. ETC */
    if(pokemon2.type2) {                /*  No todos tienen un segundo, por eso el IF   */
        p1.textContent = pokemon2.type2;
        // console.log(pokemon2.type)
    }
    // Clases de los elementos-article
    img.classList.add("imgPokemon");
    h3.classList.add("h3Pokemon");
    span.classList.add("spanPokemon")
    p.classList.add("pPokemon")
    p1.classList.add("p1Pokemon")

    // crear los hijos
    figure.appendChild(img)
    article.append(figure, h3, span, p, p1);

    sectionPokemons.appendChild(article)
    });
}


// console.log(navTiposPokemon);
navTiposPokemon();
