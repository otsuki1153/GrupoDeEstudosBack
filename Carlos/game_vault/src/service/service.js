
const gamesDB = [];

let nextId = 1;

export function CreateGame(gameData){

    const newGame = {
        id : nextId++,
        data : gameData
    }

    gamesDB.push(newGame);
    nextId++;

    return newGame;

}


