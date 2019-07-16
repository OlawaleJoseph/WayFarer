import express from 'express';
import debug from 'debug';
import swaggerUI from 'swagger-ui-express';
import userRouter from './routes/users';
import busRouter from './routes/bus';
import tripRouter from './routes/trips';
import bookingRouter from './routes/bookings';
import swaggerDoc from '../swagger.json';

// initialize app
const app = express();

// Setup app to parse json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to WayFarer');
});

// Routes Middlewares
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/buses', busRouter);
app.use('/api/v1/trips', tripRouter);
app.use('/api/v1/bookings', bookingRouter);


const port = process.env.PORT || 3000;

// listen on port
app.listen(port, () => {
  debug('http')(`App is listening on PORT ${port}`);
});

export default app;
