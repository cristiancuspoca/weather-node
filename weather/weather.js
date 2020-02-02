const axios = require('axios');

const getWeatherByLatAndLng = async(lat, lon, unit = 'metric', lang = 'es') => {
    const appid = '857947fe0dfac6311a580a9f776529d7';
    const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?appid=${appid}&lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}`
            // params: {
            //     appid,
            //     lat,
            //     lon,
            //     unit,
            //     lon
            // },
    });

    const response = await instance.get();
    //console.log(response.data);
    //console.log("--------------------------------------------------");

    if (response.status != 200) {
        throw new Error('Se presento un problema en la consulta ' + response.statusText);
    } else if (!response.data) {
        throw new Error('No hay resultados para la consuta ' + query);
    }

    const dataResponse = response.data.main;
    const temp = dataResponse.temp;

    return {
        temp,
    }
}

module.exports = {
    getWeatherByLatAndLng
}