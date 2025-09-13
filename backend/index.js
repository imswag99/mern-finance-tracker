import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import transRouter from './routes/transRoute.js';
import dashboardRouter from './routes/dashboardRoute.js';


const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || "*"
}));
app.use(cookieParser());
connectDb();


app.use('/api/user', userRouter);
app.use('/api/transaction', transRouter);
app.use('/api/dashboard', dashboardRouter);



// app.get("/", (req, res) => {
//     res.send("test")
// })

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})