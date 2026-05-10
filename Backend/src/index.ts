import express, { type Request, type Response } from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { DBconection } from './configs/db.js';
import { ErrorMiddleware } from './middlewares/error.middleware.js';
import authRoute from "./routes/auth.route.js"
import orgRoute from "./routes/organaisation.route.js"
import featRoute from "./routes/feature.route.js"
import userRoute from "./routes/user.route.js"
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
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.get('/test', (req: Request, res: Response) => {
    res.status(200).send("Server Runing...")
})

app.use('/api/auth', authRoute);
app.use('/api/organaisation', orgRoute);
app.use('/api/feature', featRoute);
app.use('/api/user', userRoute);

app.use(ErrorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is listening on ${process.env.CLIENT_URL}/test`)
})