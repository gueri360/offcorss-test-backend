import 'dotenv/config'
import './dataconfig/conect_db.js'
import  express from 'express'
import authRouters from './routes/auth.route.js'
import vtexApiRoute from "./routes/vtexApi.route.js";

const app = express()

app.use(express.json())
app.use('/api/v1/auth', authRouters);
app.use('/api/v1/vtex', vtexApiRoute);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(PORT))
