// Selección de elementos del DOM
const cityInput = document.querySelector('.city-input'); // Campo de entrada para la ciudad
const searchBtn = document.querySelector('.search-btn'); // Botón para iniciar la búsqueda

// Secciones del DOM para mostrar información
const weatherInfoSection = document.querySelector('.weather-info'); // Sección que muestra la información del clima
const notFoundSection = document.querySelector('.not-found'); // Sección que muestra un mensaje de error
const searchCitySection = document.querySelector('.search-city'); // Sección para ingresar la ciudad

// Elementos de texto para mostrar información del clima
const countryTxt = document.querySelector('.country-txt'); // Texto para el país
const tempTxt = document.querySelector('.temp-txt'); // Texto para la temperatura
const conditionTxt = document.querySelector('.condition-txt'); // Texto para las condiciones climáticas
const humidityValueTxt = document.querySelector('.humidity-value-txt'); // Texto para la humedad
const windValueTxt = document.querySelector('.wind-value-txt'); // Texto para la velocidad del viento
const weatherSummaryImg = document.querySelector('.weather-summary-img'); // Imagen de resumen del clima
const currentDateTxt = document.querySelector('.current-date-txt'); // Texto para la fecha actual

// Contenedor para los elementos de pronóstico
const forecastItemsContainer = document.querySelector('.forecast-items-container');

// Clave de la API de OpenWeatherMap
const apiKey = '703237c4dc4a1513e36572e2066267dc'; 

// Variable para almacenar los datos del CSV
let citiesData = [];

// Cargar el archivo CSV 'dataset.csv' usando Papa Parse
Papa.parse('assets/data/dataset.csv', {
    download: true,
    header: true, // Usa la primera fila como nombres de columnas
    complete: function(results) {
        citiesData = results.data; // Guardar los datos del CSV en la variable
        console.log(citiesData); // Verificación de que los datos se han cargado
    }
});

// Función para buscar la ciudad por código IATA
function getCityByIata(iataCode) {
    const city = citiesData.find(entry => entry.iata_code.toUpperCase() === iataCode.toUpperCase());
    return city ? city.city : null; // Devuelve el nombre de la ciudad o null si no encuentra
}

// Función para detectar si la entrada es IATA, ciudad o ticket
function detectarTipoEntrada(entrada) {
    const iataRegex = /^[A-Z]{3}$/i; // IATA: 3 letras
    const ticketRegex = /^[A-Z0-9]{6}$/i; // Ticket: 6 caracteres alfanuméricos

    if (iataRegex.test(entrada)) {
        return 'iata'; // Entrada es un código IATA
    } else if (ticketRegex.test(entrada)) {
        return 'ticket'; // Entrada es un ticket
    } else {
        return 'city'; // Entrada es un nombre de ciudad
    }
}

// Escuchar el evento del botón de búsqueda
searchBtn.addEventListener('click', () => {
    const inputValue = cityInput.value.trim(); // Obtener el valor de entrada

    if (inputValue != '') {
        manejarEntrada(inputValue); // Manejar la entrada del usuario
        cityInput.value = ''; // Limpiar el campo de entrada
        cityInput.blur(); // Quitar el foco del campo de entrada
    }
});

// Manejar la entrada del teclado (Enter)
cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        const inputValue = cityInput.value.trim();
        manejarEntrada(inputValue);
        cityInput.value = '';
        cityInput.blur();
    }
});

// Función para manejar diferentes tipos de entrada (IATA, ciudad, ticket)
function manejarEntrada(entrada) {
    const tipo = detectarTipoEntrada(entrada); // Detectar tipo de entrada

    if (tipo === 'iata') {
        const city = getCityByIata(entrada); // Buscar ciudad por código IATA
        if (city) {
            updateWeatherInfo(city); // Actualizar información del clima
        } else {
            showDisplaySection(notFoundSection); // Mostrar sección de no encontrado
        }
    } else if (tipo === 'city') {
        updateWeatherInfo(entrada); // Actualizar clima para el nombre de la ciudad
    } else if (tipo === 'ticket') {
        buscarPorTicket(entrada); // Llamar a la función para manejar tickets
    }
}



// Función para obtener datos de la API
async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`; // URL de la API
    const response = await fetch(apiUrl); // Obtener respuesta de la API
    return response.json(); // Retornar datos en formato JSON
}

// Función para obtener el ícono del clima basado en el ID
function getWeaatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';
    if (id <= 800) return 'clear.svg';
    else return 'clouds.svg';
}

// Función para traducir las condiciones climáticas al español
function traducirCondiciones(clima) {
    const traducciones = {
        "Clear": "Despejado",
        "Clouds": "Nublado",
        "Rain": "Lluvia",
        "Snow": "Nieve",
        "Thunderstorm": "Tormenta",
        "Drizzle": "Llovizna",
        "Atmosphere": "Neblina",
    };
    return traducciones[clima] || clima; // Devuelve la traducción o el clima original
}

// Función para obtener la fecha actual en formato legible
function getCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long'
    };
    return currentDate.toLocaleDateString('es-ES', options); // Retorna la fecha en español
}

// Actualizar la información del clima de la ciudad
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city); // Obtener datos del clima

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection); // Mostrar sección de no encontrado
        return; // Terminar función si hay error
    }

    // Desestructurar los datos relevantes del clima
    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    // Actualizar elementos del DOM con la información del clima
    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + ' °C';
    conditionTxt.textContent = traducirCondiciones(main);
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + ' M/s';

    currentDateTxt.textContent = getCurrentDate(); // Mostrar la fecha
    weatherSummaryImg.src = `assets/weather/${getWeaatherIcon(id)}`; // Cambiar imagen del clima

    await updateForecastsInfo(city); // Actualizar pronósticos
    showDisplaySection(weatherInfoSection); // Mostrar sección de información del clima
}

// Actualizar la información del pronóstico de la ciudad
async function updateForecastsInfo(city) {
    const forecastsData = await getFetchData('forecast', city); // Obtener datos de pronóstico

    const timeTaken = '12:00:00'; // Hora específica para pronóstico
    const todayDate = new Date().toISOString().split('T')[0]; // Fecha actual

    forecastItemsContainer.innerHTML = ''; // Limpiar contenedor de pronósticos
    forecastsData.list.forEach(forecastWeather => {
        // Filtrar pronósticos por fecha y hora
        if (forecastWeather.dt_txt.includes(timeTaken) &&
            !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather); // Actualizar cada elemento de pronóstico
        }
    });
}

// Actualizar un elemento de pronóstico en el DOM
function updateForecastItems(weatherData) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData;

    const dateTaken = new Date(date);
    const dateOption = {
        day: '2-digit',
        month: 'short'
    };
    const dateResult = dateTaken.toLocaleDateString('es-ES', dateOption); // Formato de fecha

    // Crear y agregar el elemento de pronóstico al contenedor
    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
            <img src="assets/weather/${getWeaatherIcon(id)}" class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
        </div>
    `;
    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem); // Agregar el nuevo pronóstico al contenedor
}

// Función para mostrar la sección deseada y ocultar las demás
function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none'); // Ocultar todas las secciones

    section.style.display = 'flex'; // Mostrar la sección seleccionada
}
