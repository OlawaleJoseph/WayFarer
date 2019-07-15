import express from 'express';
import debug from 'debug';
import userRouter from './routes/users';

// initialize app
const app = express();

// Setup app to parse json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Middlewares

app.use('/api/v1/auth', userRouter);


const port = 3000;

// listen on port
app.listen(port, () => {
  debug('http')(`App is listening on PORT ${port}`);
});

export default app;
