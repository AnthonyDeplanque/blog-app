require('dotenv').config();
const cors = require('cors');

const { router } = require('./routes');
const express = require('express');
const app = express();

const port = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());
app.use('/file-storage', express.static('file-storage'));

router(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
