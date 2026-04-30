
export function Build_Return(text) {
    return {
        Original: text,
        Tamanho: text.length,
        Maiusculo: text.toUpperCase()
    };
    // Foi alterado o código passado para criarmos diretamente o objeto JSON dentro do return, sem a necessidade de criar montando uma string manualmente e depois parseando.
    //Evitando um crash caso o usuário envie um texto que contenha caracteres especiais ou aspas, o que poderia quebrar a formatação da string JSON.
}
//Essa função recebe um texto como entrada e retorna um objeto JSON contendo o texto original, seu tamanho e a versão em maiúsculas.

export function Get_Static_Message() {
    return {
        text: "Essa é uma mensagem estática",
        timestamp: new Date().toISOString()
    };
    //Aqui estamos retornando um objeto JSON com uma mensagem estática e um timestamp indicando quando a mensagem foi gerada. O timestamp é formatado como uma string ISO 8601.
}
//Essa função retorna uma mensagem estática, que pode ser usada para testes ou como resposta padrão para requisições GET.
