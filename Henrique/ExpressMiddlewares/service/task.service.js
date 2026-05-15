let tarefas = [];
let NextId = 0;

export function GetService(){
    return tarefas;
}

export function SearchService(ParamId){
    const index = tarefas.findIndex(t => t.id === ParamId);

    if(index === -1){
        return null;
    }
    return tarefas[index];
}

export function PostService(title){
    const processedMsg = {
        "id":NextId,
        "title":title
    }

    tarefas.push(processedMsg);
    NextId++;
    return processedMsg;
}

export function PutService(OBJ, ParamId){
    const index = tarefas.findIndex(t => t.id === ParamId);

    if(index === -1){
        return null;
    }

    tarefas[index] = {
        ...tarefas[index],
        ...OBJ
    }
    return tarefas[index];
}

export function DeleteService(ParamId){
    const index = tarefas.findIndex(t => t.id === ParamId);

    if(index === -1){
        return false;
    }

    tarefas.splice(index, 1);

    return true;
}
