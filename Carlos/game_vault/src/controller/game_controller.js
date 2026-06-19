//Import do Service para ser direcionado pelo controller
import e from "express";
import { CreateGame } from "../service/service.js";

export function CreateController(req,res,next){

    const data
    const NewGame = CreateGame(data)

    res.status(201).json(NewGame)

}


