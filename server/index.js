import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import PostRouter from './routes/Posts.js';

import GenerateImageRouter from './routes/GenerateImage.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({
        success: false,
        status,
        message
    }); 

});

app.use('/api/post', PostRouter);
app.use('/api/generateImage', GenerateImageRouter);

 //Define get
app.get('/', (req, res) => {
   res.status(200).json({
     message: 'Hello....! ',
   });
});

//connect to MongoDB
const connectToDB =  () => {
   mongoose.set('strictQuery', true);
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => {
            console.error('Error connecting to MongoDB');
            console.error(error);
        });   
};
//function to start the server
const startServer = async () => {
    try {
        connectToDB();
       app.listen(5000, () => console.log('Server is running on port 5000'));
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

startServer();