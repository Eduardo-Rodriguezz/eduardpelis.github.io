var page = 1;

let numberPage = document.getElementById('pagina-number');
const btnSiguiente = document.getElementById('siguiente');
const btnAnterior = document.getElementById('anterior');



btnSiguiente.addEventListener('click', () => {
    if (page < 37000) {
    page += 1;
    cargarPeli();
    }
})

btnAnterior.addEventListener('click', () => {
    if (page > 1) {
    page -= 1;
    cargarPeli();
    }
})


const cargarPeli = async() => {

    let miContainer = document.getElementById('main');

    try {

        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cdc7845c7d75c6df00b4237fdcf24593&language=es-VE&page=${page}`);

        if (response.status === 200) {
            const data = await response.json();

            let peliculas = '';
            
            data.results.forEach(peli => {
                peliculas += 
                `            
                <div class="movies">
                    <div class="cover">
                        <img src='https://image.tmdb.org/t/p/w500/${peli.poster_path}' alt="caratula de la pelicula" style="cursor: pointer">
                    </div>  
                    <p class='titulo' style="color: #ffffff">${peli.title}<p>
        
                </div>

                `
            });             

        miContainer.innerHTML = (peliculas);
        numberPage.innerHTML = `Página ${page}`;

        console.log(data);

        } else if (response.status === 401) {
            console.log('Error de autenticación.');
        } else if (response.status === 404) {
            console.log('No se encontró la película.')
        } else {
            console.log('Error desconocido.')
        }
        
    } catch(error) {
        console.log(error)
    }
        
    console.log(page);
}

cargarPeli();
