const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const Browser = require('zombie');
const server = require('../server'); // Asegúrate de exportar tu app/server

chai.use(chaiHttp);

// ==========================
// Configurar Zombie.js
// ==========================
const browser = new Browser();
browser.site = 'https://boilerplate-mochachai-jycm.onrender.com';

// ==========================
// suiteSetup con done() corregido
// ==========================
suiteSetup(function(done) {
  this.timeout(5000);
  browser.visit('/', done);
});

// ==========================
// Suite de tests funcionales
// ==========================
suite('Functional Tests with Zombie.js and Chai-HTTP', function () {
  this.timeout(10000);

  // --------------------------
  // Tests con chai-http
  // --------------------------
  suite('Integration tests with chai-http', function () {

    test('Test GET /hello with no name', function(done) {
      chai.request(server)
        .get('/hello')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });

    test('Test GET /hello with your name', function(done) {
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
  // Tests de formulario HTML con Zombie
  // --------------------------
  suite('"Famous Italian Explorers" form', function () {

    test('Submit the surname "Colombo" in the HTML form', async function() {
      await browser.fill('surname', 'Colombo'); // nombre del input
      await browser.pressButton('submit');       // botón submit

      browser.assert.success();
      browser.assert.text('span#name', 'Cristoforo');
      browser.assert.text('span#surname', 'Colombo');
      browser.assert.elements('span#dates', 1);
    });

    test('Submit the surname "Vespucci" in the HTML form', async function() {
      await browser.fill('surname', 'Vespucci');
      await browser.pressButton('submit');

      browser.assert.success();
      browser.assert.text('span#name', 'Amerigo');
      browser.assert.text('span#surname', 'Vespucci');
      browser.assert.elements('span#dates', 1);
    });

  });

});
