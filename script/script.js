const tipoColor = {
  electric: '#f3cf3f',
  grass: '#b4de6e',
  fire: '#e07f3f',
  water: '#8db5ac',
  normal: '#d3b26a', 
  poison: '#977bb8',
  fairy: '#b35561',
  ground: '#a57554',
  fighting: '#8a928f',
  psychic: '#b46494',
  rock: '#574e48',
  dragon:'#fce671',
  bug: '#383517',
  dark: '#2f323f',
  ghost: '#3a5570',
  steel: '#7c94a4',
  flying: '#95b7ee',
}



function getContrastColor(hexColor) {
  // Convertir hex a RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calcular luminosidad
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
// Función para obtener datos de la API usando Promesas
async function obtenerDatos(param) {
  try {
    // console.log('Iniciando petición con async/await...');
    for (let i = 1; i <= param; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      // console.log('Respuesta recibida (async/await). Status:', response.status);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue "ok" (async/await): ' + response.statusText);
      }
      const data = await response.json();
      // console.log('Datos obtenidos (async/await):', data);
      let listaPokemon = document.getElementById('listaPokemon');

      const card = document.createElement('div');
      card.className = 'card';
      const types = data.types.map(t => t.type.name);
      
      const primaryType = data.types['0'].type.name;
      
    
      let cardColor = tipoColor[primaryType] || '#777';
      
      if (types.length > 1) {
        const secondaryType = types[1];
        console.log('Tipo secundario:', secondaryType);
        cardColor = `linear-gradient(135deg, ${tipoColor[primaryType]} 0%, ${tipoColor[secondaryType]} 100%)`;
      }

      card.style.background = cardColor;
      card.style.color = getContrastColor(cardColor); 

      card.innerHTML =
        `<p class="pokemon-id">#${data.id}</p>
          <div class="pokemon-img">
              <img class="imgCard" src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}"/>
          </div>
          <div class="nombre-contenedor">
              <h2 class="cardTitle">    ${data.name.toUpperCase()}</h2>
              
          </div>
          <div class="pokemon-tipos">
              <h3>Tipo</h3>
              <p class="type-1">${data.types['0'].type.name}</p>
              <p class="type-2">${data.types['1'] ? data.types['1'].type.name : ''}</p>
              
          </div>
          <div class="pokemon-stats">
              <p class="cardStats">Weight: ${data.weight}</p>
              <p class="cardStats">Habilidades: ${data.abilities['0'].name}</p>
              <p class="cardStats">base experience: ${data.base_experience}</p>
              <p class="cardStats">Hp: ${data.stats['0'].base_stat}</p>
          </div>`;
      listaPokemon.appendChild(card);

    }

  } catch (error) {
    console.error('Hubo un problema con la petición fetch (async/await):', error);
  }
};
obtenerDatos(10);



async function filtrarPokemon() {
  let buttonSearch = document.getElementById("btnSearch");
  console.log(buttonSearch);
  const input = document.getElementById('search');
  console.log(input.value);
  const search = input.value.toLowerCase();
  for (let i = 1; i <= 151; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const data = await response.json();

    if (data.name === search) {
      console.log('Pokemon encontrado:', data.name);
      let listaPokemon = document.getElementById('listaPokemon');
      listaPokemon.innerHTML = '';
      const card = document.createElement('div');
      card.className = 'card';
      const types = data.types.map(t => t.type.name);
      
      const primaryType = data.types['0'].type.name;
      
    
      let cardColor = tipoColor[primaryType] || '#777';
      
      if (types.length > 1) {
        const secondaryType = types[1];
        console.log('Tipo secundario:', secondaryType);
        cardColor = `linear-gradient(135deg, ${tipoColor[primaryType]} 0%, ${tipoColor[secondaryType]} 100%)`;
      }

      card.style.background = cardColor;
      card.style.color = getContrastColor(cardColor); 
      card.innerHTML =
        `<p class="pokemon-id">#${data.id}</p>
        <div class="pokemon-img">
            <img class="imgCard" src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}"/>
        </div>
        <div class="nombre-contenedor">
            <h2 class="cardTitle">    ${data.name.toUpperCase()}</h2>
            
        </div>
        <div class="pokemon-tipos">
            <h3>Tipos</h3>
            <p class="type-1">${data.types['0'].type.name}</p>
            <p class="type-2">${data.types['1'] ? data.types['1'].type.name : ''}</p>
            
        </div>
        <div class="pokemon-stats">
            <p class="cardStats">Weight: ${data.weight}</p>
            <p class="cardStats">Habilidades: ${data.abilities['0'].name}</p>
            <p class="cardStats">base experience: ${data.base_experience}</p>
            <p class="cardStats">Hp: ${data.stats['0'].base_stat}</p>
        </div>`;
      listaPokemon.appendChild(card);
      break;

    }
    // else {
    //   console.log('Pokemon no encontrado:', data.name);
    //   let listaPokemon = document.getElementById('listaPokemon');
    //   listaPokemon.innerHTML = '';
    //   const card = document.createElement('div');
    //   card.className = 'card';
    //   card.innerHTML = 
    //     `<p class="pokemon-id">No se encontró el Pokémon</p>`;
    //   listaPokemon.appendChild(card);
    // }

  };
  input.value = '';
}

buttonSearch.addEventListener('click', filtrarPokemon);

console.log(buttonSearch);


