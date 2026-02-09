// Selecionando os elementos do HTML
const botao = document.getElementById('buscarBtn');
const inputCidade = document.getElementById('cidadeInput');
const displayResultado = document.getElementById('resultado');

// Função que será executada quando o usuário clicar
botao.addEventListener('click', async () => {
    const cidade = inputCidade.value;

    if (cidade === "") {
        alert("Por favor, digite o nome de uma cidade.");
        return;
    }

    displayResultado.innerHTML = "Carregando...";

    // Chamando a função que está no seu arquivo api.js
  // Dentro do clique do botão:
const dadosClima = await buscarClimaPorCidade(cidade);
console.log("Dados recebidos da API:", dadosClima);

// No seu main.js, substitua a parte do displayResultado por esta:

if (dadosClima) {

  const textoClima = traduzirClima(dadosClima.weathercode);

  // ATUALIZA O FUNDO 
  /**
 * Altera a cor de fundo (background) da página com base na temperatura atual.
 * @param {number} temp - A temperatura em graus Celsius.
 */
    atualizarFundo(dadosClima.temperature);

    displayResultado.innerHTML = `
        <h3>${cidade}</h3>
        <span class="icone-grande">${textoClima.icone}</span>
        <p>Tempo: ${textoClima.texto}</p> 
        <h2 class="temp">${dadosClima.temperature}°C</h2>
        <p>Vento: ${dadosClima.windspeed} km/h</p>
    `;
}else {
        displayResultado.innerHTML = "Erro ao encontrar cidade.";
    }
});

function atualizarFundo(temp) {
    const corpo = document.body;

    if (temp > 25) {
        // Fundo quente (Degradê Laranja/Vermelho)
        corpo.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)";
    } else if (temp <= 25 && temp > 15) {
        // Fundo agradável (Degradê Azul/Ciano)
        corpo.style.background = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    } else {
        // Fundo frio (Degradê Roxo/Azul Escuro)
        corpo.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
}