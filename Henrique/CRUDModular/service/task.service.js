let tarefas = [];
let id = 0;

export function PostService(title){
    const body = `{"id":${id}, "title":"${title}"}`;
    const jsonBody = JSON.parse(body);
    tarefas.push(jsonBody);
    id++;

    return JSON.stringify(jsonBody);
}

export function PutService(idRecebido, newtitle){
    const index = tarefas.findIndex(t => t.id === idRecebido);
    const jsonBody = JSON.parse(newtitle);

    if(index === -1){
        return -1;
    }

    tarefas[index] = {
        ...tarefas[index],
        ...jsonBody
    }

    return JSON.stringify(tarefas[index]);
}

export function GetService(){
    return JSON.stringify(tarefas);
}

export function SearchService(idRecebido){
    const index = tarefas.findIndex(t => t.id === idRecebido);
    if(index === -1){
        return -1;
    }
    return JSON.stringify(tarefas[index]);
}

export function DeleteService(idRecebido){
    const index = tarefas.findIndex(t => t.id === idRecebido);
    if(index === -1){
        return -1
    }
    tarefas.splice(index,1);
    return 0;
}

