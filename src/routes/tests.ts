import {app} from "../app";
import {db, DBType} from "../db/db";
import {Express} from "express";

export const addTestsRoutes = (app: Express, db: DBType) => {
    app.delete('/__test__/data',(req,
                                                res)=>{
        db.courses = [];
        res.sendStatus(204)
    })
}