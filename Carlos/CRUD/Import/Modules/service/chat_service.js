let messages = []; // Array para armazenar as mensagens
let currentId = 0; // Variável para gerar IDs únicos para as mensagens

export function Build_Return(text) {
    currentId++; // Incrementa o ID para a nova mensagem
    return {
        id: currentId,
        Original: text,
        Tamanho: text.length,
        Maiusculo: text.toUpperCase()
    };
    // Foi alterado o código passado para criarmos diretamente o objeto JSON dentro do return, sem a necessidade de criar montando uma string manualmente e depois parseando.
    //Evitando um crash caso o usuário envie um texto que contenha caracteres especiais ou aspas, o que poderia quebrar a formatação da string JSON.
}
//Essa função recebe um texto como entrada e retorna um objeto JSON contendo o texto original, seu tamanho e a versão em maiúsculas.

export function Get_Static_Message(currentId) {
    return messages.find(msg => msg.id === currentId) || { erro: "Mensagem não encontrada" };
    //Essa função recebe um ID como entrada e retorna a mensagem correspondente do array "messages". Se a mensagem não for encontrada, retorna um objeto JSON com uma mensagem de erro.
}


export function Update_Data(currentId, newText) {

    const MensagemAtualizada = {
        id: currentId,
        text: newText,
    };

    messages[currentId] = MensagemAtualizada;

}

export function Delete_Message(id) {

    const index = message.findIndex(t => t.id === id);
    //Procurando o índice da mensagem com o ID fornecido no array "message". A função findIndex retorna o índice da primeira ocorrência que satisfaz a condição

    if (index === -1) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        return res.end("Id não encontrado");
    }//Se o índice for -1, significa que a mensagem com o ID fornecido não foi encontrada. Nesse caso, retornamos um erro 404 indicando que o ID não foi encontrado.

    message.splice(index, 1);
    //Usamos a função splice para remover a mensagem do array "message" com base no índice encontrado.
    // O primeiro argumento de splice é o índice onde a remoção deve começar, e o segundo argumento é o número de elementos a serem removidos (neste caso, 1).

    res.writeHead(200);
    res.end();
}