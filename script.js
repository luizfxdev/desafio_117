// Função principal para encontrar palavras encantadas
function findEnchantedWords(words) {
    // Filtra palavras vazias e converte para array se for string
    const wordList = Array.isArray(words)
        ? words.filter(p => p.trim() !== '')
        : words.split(',').map(p => p.trim()).filter(p => p !== '');

    const enchantedWords = [];
    let previousLettersSum = 0;

    // Itera sobre cada palavra para verificar se é encantada
    wordList.forEach((word, index) => {
        // O índice começa em 1 para o cálculo
        const position = index + 1;
        const wordLength = word.length;

        // Verifica a condição mágica: soma anterior = tamanho * posição
        if (previousLettersSum === wordLength * position) {
            enchantedWords.push(word);
        }

        // Atualiza a soma com o tamanho da palavra atual
        previousLettersSum += wordLength;
    });

    return enchantedWords;
}

// Função para lidar com o clique no botão Desvendar
function handleDiscover() {
    // Obtém o valor do input e remove espaços em branco
    const inputWords = document.getElementById('palavras').value;

    // Encontra as palavras encantadas
    const result = findEnchantedWords(inputWords);

    // Exibe o resultado na página
    const resultElement = document.getElementById('resultado');

    if (result.length > 0) {
        resultElement.innerHTML = `
            <p>O eco mágico revelou estas palavras encantadas...</p>
            <ul>
                ${result.map(word => `<li>${word}</li>`).join('')}
            </ul>
        `;
    } else {
        resultElement.innerHTML = `
            <p>Nenhuma palavra encantada foi encontrada. O eco permanece um mistério...</p>
        `;
    }
}

// Função para limpar o formulário
function handleReturn() {
    document.getElementById('palavras').value = '';
    document.getElementById('resultado').innerHTML = '';
}

// Adiciona event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('desvendar').addEventListener('click', handleDiscover);
    document.getElementById('retornar').addEventListener('click', handleReturn);

    // Adiciona evento para tecla Enter no input
    document.getElementById('palavras').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleDiscover();
        }
    });
});