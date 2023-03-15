import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {router} from './routes'
import dotenv from 'dotenv';

dotenv.config()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));


app.use(router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
