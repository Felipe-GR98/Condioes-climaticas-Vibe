// js/api.js

const codigosClima = {
    0: { texto: "Céu Limpo", icone: "☀️" },
    1: { texto: "Principalmente Limpo", icone: "🌤️" },
    2: { texto: "Parcialmente Nublado", icone: "⛅" },
    3: { texto: "Nublado", icone: "☁️" },
    45: { texto: "Nevoeiro", icone: "🌫️" },
    51: { texto: "Drizzle Leve", icone: "🌦️" },
    61: { texto: "Chuva Leve", icone: "🌧️" },
    63: { texto: "Chuva Moderada", icone: "🌧️" },
    65: { texto: "Chuva Forte", icone: "⛈️" },
    80: { texto: "Pancadas de Chuva", icone: "🌦️" },
    95: { texto: "Trovoada", icone: "⛈️" }
};


/**
 * Traduz o código meteorológico (WMO) para uma descrição em português e um emoji.
 * @param {number} codigo - O código de interpretação meteorológica da API.
 * @returns {Object} Um objeto contendo a descrição (texto) e o ícone (emoji).
 */
// Ajuste a função para retornar o objeto completo
function traduzirClima(codigo) {
     return codigosClima[codigo] || { texto: "Condição Desconhecida", icone: "❓" };
}

/**
 * Busca dados meteorológicos atuais de uma cidade específica através da API.
 * * @param {string} city - O nome da cidade para a qual deseja obter os dados.
 * @returns {Promise<Object>} Um objeto JSON contendo as chaves: temperature, humidity e wind_speed.
 * * @example
 * // Exemplo de uso:
 * fetch_weather_data("Recife")
 * .then(data => console.log(`Temp: ${data.temperature}°C, Umidade: ${data.humidity}%`))
 * .catch(error => console.error("Erro ao buscar dados:", error));
 */
async function buscarClimaPorCidade(cidade) {
    try {
        // 1. Passo: Geocoding - Transformar nome em Lat/Long
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            console.log("Cidade não encontrada.");
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        // 2. Passo: Buscar o clima com as coordenadas obtidas
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // 3. Resultado
        const temperatura = weatherData.current_weather.temperature;
        console.log(`A temperatura atual em ${name} é: ${temperatura}°C`);
        
        return weatherData.current_weather;

    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }

    // Dentro da função buscarClimaPorCidade, o return deve ser assim:
return {
    temp: weatherData.current_weather.temperature,
    vento: weatherData.current_weather.windspeed,
    descricao: traduzirClima(weatherData.current_weather.weathercode)
};
}

// No final do seu arquivo js/api.js
if (typeof module !== 'undefined') {
    module.exports = { traduzirClima, buscarClimaPorCidade };
}

buscarClimaPorCidade();