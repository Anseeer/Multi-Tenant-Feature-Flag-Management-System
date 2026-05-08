import express, { type Request, type Response } from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { DBconection } from './configs/db.js';
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import authRoute from "./routes/auth.route.js"
import orgRoute from "./routes/organaisation.route.js"
import cookieParser from 'cookie-parser';

dotenv.config();
DBconection()

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.get('/test', (req: Request, res: Response) => {
    res.status(200).send("Server Runing...")
})

app.use('/api/auth', authRoute);
app.use('/api/organaisation', orgRoute);


app.use(ErrorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:3003/test`)
})