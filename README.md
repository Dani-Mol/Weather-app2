# Weather-app2
Weather App es una aplicación de pronóstico del clima con una interfaz intuitiva y facil de usar en la que se que obtienen datos meteorológicos en tiempo real utilizando el nombre de la ciudad, un código IATA (código de aeropuerto) o número de boleto opara mostrar el clima de la ciudad destino del usuario. Está construida con JavaScript en el backend y utiliza HTML/CSS para una interfaz de usuario elegante y moderna.


## Funcionalidades

Datos meteorológicos en tiempo real: Obtiene la información actual del clima basándose en el código IATA o ciudad ingresado por el usuario.
Interfaz de usuario amigable: Diseñada para que el usuario a pesar de equivocarse, pueda emplearla las veces que sea.
Diseño interactivo: Fácil de usar con validación de entradas y pronósticos detallados del clima actual y días posteriores.
Expandible: Lista para integrar más cosas.

## Requisitos 

Antes de comenzar, asegúrate de tener lo siguiente:

Node.js (opcional para servir archivos estáticos o utilizar herramientas como npm o yarn).
Navegador moderno (Chrome, Firefox, Edge, Safari).

## Instalación

1. Clonar repositorio

```
git clone https://github.com/usuario/weather-app.git
cd weather-app
```

2. Estructura de archivos
Asegúrate de que la estructura de archivos de tu proyecto sea similar a esta:

```
WEATHER-APP2/
│
├── assets/
│   ├── data/
│   │   └── dataset.csv          # Archivo de datos CSV, posiblemente con información de ciudades y códigos IATA
│   ├── message/
│   │   ├── not-found.png        # Imagen para mostrar cuando no se encuentra la ciudad
│   │   └── search-city.png      # Imagen para la búsqueda de la ciudad
│   ├── weather/
│   │   ├── atmosphere.svg       # Icono para la condición climática de atmósfera
│   │   ├── clear.svg            # Icono para clima despejado
│   │   ├── clouds.svg           # Icono para clima nublado
│   │   ├── drizzle.svg          # Icono para llovizna
│   │   ├── rain.svg             # Icono para lluvia
│   │   ├── snow.svg             # Icono para nieve
│   │   └── thunderstorm.svg     # Icono para tormenta eléctrica
│   └── bg.jpg                   # Imagen de fondo para la aplicación
├── readme.txt                   # Archivo de texto con instrucciones o detalles del proyecto
├── .gitignore                   # Archivo para ignorar ciertos archivos en control de versiones (Git)
├── index.html                   # Archivo HTML principal de la aplicación
├── LICENSE                      # Archivo de licencia del proyecto
├── main.js                      # Archivo JavaScript principal
├── Manual de Procedim...         # Documento PDF relacionado con el procedimiento o guía del proyecto
├── README.md                    # Archivo README en formato Markdown con instrucciones para el proyecto
└── style.css                    # Archivo CSS para el estilo de la aplicación

```

3. Ejecutar el Frontend
Abre el archivo index.html usando un servidor local como Live Server en Visual Studio Code.







