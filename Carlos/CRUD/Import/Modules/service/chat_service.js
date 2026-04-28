
export function Build_Return(text) {
    const msg = `{"Original": "${text}", "Tamanho": ${text.length}, "Maiusculo": "${text.toUpperCase()}"}`;
    const JsonMsg = JSON.parse(msg);
    return JsonMsg;
}
//Essa função recebe um texto como parâmetro, constrói um objeto JSON contendo o texto original, seu tamanho e sua versão em maiúsculas, e retorna esse objeto JSON.