const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const Browser = require('zombie'); // Importar Zombie.js
const server = require('../server');

chai.use(chaiHttp);

// Instancia de Zombie
const browser = new Browser();
browser.site = 'https://boilerplate-mochachai-jycm.onrender.com';

// Visita la página principal antes de correr los tests de Zombie
suiteSetup(async function() {
  this.timeout(5000);
  await browser.visit('/');
});

suite('Functional Tests with Zombie.js and Chai-HTTP', function () {
  this.timeout(10000); // Timeout mayor para Render

  // =============================
  // Tests con chai-http
  // =============================
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

  // =============================
  // Tests con formulario HTML usando Zombie
  // =============================
  suite('"Famous Italian Explorers" form', function () {

    test('Submit the surname "Colombo" in the HTML form', async function() {
      this.timeout(5000);
      await browser.visit('/');
      await browser.fill('surname', 'Colombo'); // input name="surname"
      await browser.pressButton('submit'); // botón submit

      browser.assert.success();
      browser.assert.text('#name', 'Cristoforo'); // Ajusta selectores si tu HTML es distinto
      browser.assert.text('#surname', 'Colombo');
    });

    test('Submit the surname "Vespucci" in the HTML form', async function() {
      this.timeout(5000);
      await browser.visit('/');
      await browser.fill('surname', 'Vespucci');
      await browser.pressButton('submit');

      browser.assert.success();
      browser.assert.text('#name', 'Amerigo');
      browser.assert.text('#surname', 'Vespucci');
    });

  });

});
