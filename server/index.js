import express from 'express';
import debug from 'debug';

// initialize app
const app = express();

// Setup app to parse json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;

// listen on port
app.listen(port, () => {
  debug('http')(`App is listening on PORT ${port}`);
});

export default app;
