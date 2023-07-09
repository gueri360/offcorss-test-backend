import 'dotenv/config'
import './dataconfig/conect_db.js'
import  express from 'express'
import authRouters from './routes/auth.route.js'
import vtexApiRoute from "./routes/vtexApi.route.js";
import cors from "cors";

const whiteList ={
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(whiteList))
app.use(express.json());
app.use('/api/v1/auth', authRouters);
app.use('/api/v1/vtex', vtexApiRoute);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(  `PORT:${PORT}`))


