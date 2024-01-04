import express from "express";
import {getCoursesRouter} from "./routes/courses";
import {getTestsRouter} from "./routes/tests";
import {db} from "./db/db";

export const app = express();
export const jsonBodyMiddleware = express.json()


app.use(jsonBodyMiddleware)

// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "connect-src 'self' http://localhost:3000");
//     next();
//   });

app.use('/courses', getCoursesRouter(db))
app.use('/__test__', getTestsRouter(db))


