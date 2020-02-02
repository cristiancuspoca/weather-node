const axios = require('axios');

const getLatAndLon = async(query) => {
    let encodeQ = encodeURI(query);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeQ}`,
        headers: {
            "content-type": "application/octet-stream",
            "X-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
            "X-rapidapi-Key": "c8cd4442eemsh4b2d082fc27af48p1dfcc7jsnce44787b53de"
        },
    });

    const response = await instance.get();
    //console.log(response.data.Results[0]);
    //console.log("--------------------------------------------------");

    if (response.status != 200) {
        throw new Error('Se presento un problema en la consulta ' + response.statusText);
    } else if (response.data.Results.length == 0) {
        throw new Error('No hay resultados para la consuta ' + query);
    }
    const dataResponse = response.data;
    let results = dataResponse.Results;

    const name = results[0].name;
    const type = `${results[0].type} - ${results[0].c}`;
    const lat = results[0].lat;
    const lng = results[0].lon;

    return {
        name,
        type,
        lat,
        lng,
    }
}

module.exports = {
    getLatAndLon
}