// Array que atua como nosso "banco de dados" em memória para armazenar as tarefas.
let tasks = [];
// Variável para simular o auto-incremento gerando IDs únicos para cada nova tarefa.
let NextId = 0;


export function Get_Service() {
    // Retorna a lista completa de tarefas.
    return tasks;
}

export function Search_Service(id) {
    // Busca o índice da tarefa no array comparando o ID recebido.
    const index = tasks.findIndex(task => task.id === id);
    
    if (index !== -1) {
        // Se encontrou (índice diferente de -1), retorna o objeto da tarefa.
        return tasks[index];
    } else {
        // Se não encontrou, retorna null para o controller tratar (ex: erro 404).
        return null;
    }
}

export function Post_Service(title) {
    // Monta o objeto da nova tarefa.
    const ProcessedMsg = {
        id: NextId,
        title: title,
    }

    // Adiciona a nova tarefa no final do array.
    tasks.push(ProcessedMsg);
    // Incrementa o contador de ID para que a próxima tarefa tenha um ID diferente.
    NextId++;
    // Retorna a tarefa recém-criada para o controller.
    return ProcessedMsg;
}

export function Put_Service(JSON_Body, Param_Id) {
    // Busca o índice da tarefa que será atualizada.
    const index = tasks.findIndex(task => task.id === Param_Id);

    if (index == -1) {
        // Retorna null se o ID não existir.
        return null;
    } 
    
    // Atualiza a tarefa mesclando os dados antigos (...tasks[index]) com os novos (...JSON_Body).
    tasks[index] = {
        ...tasks[index],
        ...JSON_Body,
    }
    // Retorna a tarefa já atualizada.
    return tasks[index];
}

export function Delete_Service(Param_Id){
    // Busca o índice da tarefa a ser removida.
    const index = tasks.findIndex(task => task.id === Param_Id);

    if (index == -1) {
        // Retorna falso se não encontrar a tarefa.
        return false;
    } 

    // O método splice remove 1 elemento do array a partir do índice especificado.
    tasks.splice(index, 1);
    // Retorna verdadeiro indicando que a exclusão foi um sucesso.
    return true;
}
