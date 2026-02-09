// js/api.test.js
const { traduzirClima } = require('./api');

test('Deve retornar "Céu Limpo" e o emoji de sol para o código 0', () => {
    const resultado = traduzirClima(0);
    expect(resultado.texto).toBe("Céu Limpo");
    expect(resultado.icone).toBe("☀️");
});

test('Deve retornar "Condição Desconhecida" para um código inexistente', () => {
    const resultado = traduzirClima(999);
    expect(resultado.texto).toBe("Condição Desconhecida");
});