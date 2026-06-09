let taks = [];
let nextId = 0;

export function GetService() {
    return taks;
}

export function SearchService(id) {
    const index = taks.findIndex((task) => task.id === id);

    if (index === -1) {
        return null;
    }
    return taks[index];
}

export function PostService(title) {
    const processedTask = {
        id: nextId++,
        title: title,
        completed: false
    };

    taks.push(processedTask);
    return processedTask;
}

export function PutService(id, body) {
    const index = taks.findIndex((task) => task.id === id);

    if (index === -1) {
        return null;
    }

    taks[index] = {
        ...taks[index],
        ...body
    }
    return taks[index];
}

export function DeleteService(id) {
    const index = taks.findIndex((task) => task.id === id);

    if (index === -1) {
        return false;
    }

    taks.splice(index, 1);

    return true;
}
