// Función para buscar amiibos que coincidan con el término de búsqueda
async function searchAmiibos(searchTerm) {
    const apiUrl = `https://www.amiiboapi.com/api/amiibo/?name=${searchTerm}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.amiibo;
    } catch (error) {
        console.error('Error al buscar amiibos:', error);
        return [];
    }
}

// Función para mostrar las tarjetas de amiibos
async function showAmiibos(searchTerm) {
    const amiibos = await searchAmiibos(searchTerm);
    const amiiboCardsContainer = document.getElementById('amiiboCards');
    amiiboCardsContainer.innerHTML = '';

    amiibos.forEach(amiibo => {
        const card = document.createElement('div');
        card.classList.add('amiiboCard');
        card.innerHTML = `
            <h2>${amiibo.name} (${amiibo.character})</h2>
            <img src="${amiibo.image}" alt="${amiibo.name}">
            <p>Juego: ${amiibo.gameSeries}</p>
            <p>- Serie amiibo: ${amiibo.amiiboSeries}</p>
            <p>Fecha de lanzamiento:</p>
            <ul>
                <li>Australia: ${amiibo.release.au}</li>
                <li>Europa: ${amiibo.release.eu}</li>
                <li>Japón: ${amiibo.release.jp}</li>
                <li>Norteamérica: ${amiibo.release.na}</li>
            </ul>
        `;
        amiiboCardsContainer.appendChild(card);
    });
}

// Mostrar los amiibos que inician con la letra 'M' al cargar la página
showAmiibos('m');

// Manejar la búsqueda de amiibos
document.getElementById('searchInput').addEventListener('input', function(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    if (searchTerm.length >= 1) {
        showAmiibos(searchTerm);
    } else {
        // Mostrar todos los amiibos si no hay término de búsqueda
        showAmiibos('');
    }
});
