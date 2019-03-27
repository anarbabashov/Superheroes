const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.NODE_ENV === 'development' ? 3001 : 3010;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded
app.use(express.static('./static'));
app.use(cors());
app.options('*', cors());

require('./routes/health')(app);
require('./routes/users')(app);

app.listen(port, () => {
  console.log(`listening on ${port}`);
})

module.exports = app;
