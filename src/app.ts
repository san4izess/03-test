import express from "express";
import {addCoursesRoutes} from "./routes/courses";
import {addTestsRoutes} from "./routes/tests";
import {db} from "./db/db";

export const app = express();
export const jsonBodyMiddleware = express.json()


app.use(jsonBodyMiddleware)

// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "connect-src 'self' http://localhost:3000");
//     next();
//   });

addCoursesRoutes(app, db)
addTestsRoutes(app, db)

