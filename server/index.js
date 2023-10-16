import express from 'express';
import cors from 'cors';
import adminRoute from './routes/adminRoutes.js';
import connectdb from './dbconfig/connectdb.js';

const app = express();

//connect db
connectdb();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1/admin', adminRoute);

//port
const PORT = process.env.PORT || 8080;

//listen 
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});