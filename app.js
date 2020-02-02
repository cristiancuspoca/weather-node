const place = require('./place/place');
const weather = require('./weather/weather');

const argv = require('yargs').options({
    query: {
        alias: 'q',
        description: 'parameter search',
        demand: true
    }
}).argv;


const getInfo = async(name) => {
    try {
        const resLatAndLng = await place.getLatAndLon(name);
        const resWeather = await weather.getWeatherByLatAndLng(resLatAndLng.lat, resLatAndLng.lng);
        return `El clima de "${resLatAndLng.name}" es de ${resWeather.temp} C°`;
    } catch (e) {
        return `No se pudo obtener el clima de "${name}" ERROR ${e}`;
    }
};


getInfo(argv.query)
    .then(console.log)
    .catch(console.log);