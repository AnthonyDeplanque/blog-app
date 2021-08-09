require('dotenv').config();
// const { routes } = require('./routes');
const express = require('express');
const app = express();

const port = process.env.PORT || 1234;

app.use(express.json());

// routes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
