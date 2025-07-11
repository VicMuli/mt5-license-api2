const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const licenseRoutes = require('./routes/licenseRoutes');
app.use('/', licenseRoutes);

app.listen(port, () => {
  console.log(`License API running at http://localhost:${port}`);
});
