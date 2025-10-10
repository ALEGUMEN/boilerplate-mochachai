'use strict';
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// GET /hello
app.get('/hello', (req, res) => {
  const name = req.query.name || 'Guest';
  res.type('txt').send('hello ' + name);
});

// PUT /travellers
app.put('/travellers', (req, res) => {
  const surname = req.body.surname;
  let name = '';
  let dates = '';

  switch (surname.toLowerCase()) {
    case 'polo':
      name = 'Marco';
      dates = '1254 - 1324';
      break;
    case 'colombo':
      name = 'Cristoforo';
      dates = '1451 - 1506';
      break;
    case 'vespucci':
      name = 'Amerigo';
      dates = '1454 - 1512';
      break;
    case 'da verrazzano':
      name = 'Giovanni';
      dates = '1485 - 1528';
      break;
    default:
      name = 'unknown';
  }

  res.json({ name, surname, dates });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});

module.exports = app; // for testing
