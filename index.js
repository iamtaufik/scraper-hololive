const express = require('express');
const router = require('./routes/route.js');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["*","http://localhost:3000"],
  })
);
app.use('/v1/api', router);

app.listen(PORT, () => {
  console.log('server up and running');
});
