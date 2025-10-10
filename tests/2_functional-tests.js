const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const Browser = require('zombie');
const server = require('../server'); // tu app/server

chai.use(chaiHttp);

// ==========================
// Configuración de Zombie.js
// ==========================
const browser = new Browser();
browser.site = 'http://localhost:3000'; // o tu URL si está en línea

suiteSetup(function(done) {
  this.timeout(5000);
  return browser.visit('/', done);
});

// ==========================
// Suite de tests funcionales
// ==========================
suite('Functional Tests with Zombie.js and Chai-HTTP', function() {
  this.timeout(10000);

  // --------------------------
  // Tests de integración con chai-http
  // --------------------------
  suite('Integration tests with chai-http', function() {
    test('Test GET /hello con sin nombre', function(done) {
      chai.request(server)
        .get('/hello')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });

    test('Test GET /hello con nombre', function(done) {
      chai.request(server)
        .get('/hello?name=xy_z')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });

    test('Send {surname: "Colombo"}', function(done) {
      chai.request(server)
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');
          done();
        });
    });

    test('Send {surname: "da Verrazzano"}', function(done) {
      chai.request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
          done();
        });
    });
  });

  // --------------------------
  // Tests del formulario HTML con Zombie
  // --------------------------
  suite('"Famous Italian Explorers" form', function() {
    
    test('Submit the surname "Colombo" en el formulario HTML', async function() {
      this.timeout(5000);
      await browser.visit('/');
      await browser.fill('surname', 'Colombo');
      await browser.pressButton('submit');

      browser.assert.success();                       // status 200
      browser.assert.text('span#name', 'Cristoforo');
      browser.assert.text('span#surname', 'Colombo');
      browser.assert.elements('span#dates', 1);       // solo hay uno
    });

    test('Submit the surname "Vespucci" en el formulario HTML', async function() {
      this.timeout(5000);
      await browser.visit('/');
      await browser.fill('surname', 'Vespucci');
      await browser.pressButton('submit');

      browser.assert.success();
      browser.assert.text('span#name', 'Amerigo');
      browser.assert.text('span#surname', 'Vespucci');
      browser.assert.elements('span#dates', 1);
    });

  });

});
