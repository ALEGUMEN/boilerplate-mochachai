const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

  suite('Integration tests with chai-http', function () {

    test('Test GET /hello with no name', function (done) {
      chai.request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });

    test('Test GET /hello with your name', function (done) {
      chai.request(server)
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });

    test('Send {surname: "Colombo"}', function (done) {
      chai.request(server)
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');
          done();
        });
    });

    test('Send {surname: "Vespucci"}', function (done) {
      chai.request(server)
        .put('/travellers')
        .send({ surname: 'Vespucci' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Amerigo');
          assert.equal(res.body.surname, 'Vespucci');
          done();
        });
    });

    test('Send {surname: "da Verrazzano"}', function (done) {
      chai.request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
          done();
        });
    });

    test('Send {surname: "Polo"}', function (done) {
      chai.request(server)
        .put('/travellers')
        .send({ surname: 'Polo' })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Marco');
          assert.equal(res.body.surname, 'Polo');
          done();
        });
    });
  });

  const Browser = require('zombie');
  Browser.site = "https://boilerplate-mochachai-jycm.onrender.com"; // tu app en Render

suite('Functional Tests with Zombie.js', function() {
  this.timeout(20000); // tiempo extra para carga remota

  const browser = new Browser();

  suiteSetup(async function() {
    await browser.visit('/'); // abre la página principal
  });

  test('should have a working "site" property', function() {
    assert.ok(browser.site);
  });

  suite('"Famous Italian Explorers" form', function() {

    test('Submit the surname "Colombo"', async function() {
      await browser.visit('/');
      await browser.fill('surname', 'Colombo');
      await browser.pressButton('submit');
      
      browser.assert.text('span#name', 'Cristoforo');
      browser.assert.text('span#surname', 'Colombo');
      browser.assert.element('span#dates'); // verifica que exista la fecha
    });

    test('Submit the surname "Vespucci"', async function() {
      await browser.visit('/');
      await browser.fill('surname', 'Vespucci');
      await browser.pressButton('submit');

      browser.assert.text('span#name', 'Amerigo');
      browser.assert.text('span#surname', 'Vespucci');
      browser.assert.element('span#dates');
    });

    test('Submit the surname "da Verrazzano"', async function() {
      await browser.visit('/');
      await browser.fill('surname', 'da Verrazzano');
      await browser.pressButton('submit');

      browser.assert.text('span#name', 'Giovanni');
      browser.assert.text('span#surname', 'da Verrazzano');
      browser.assert.element('span#dates');
    });

    test('Submit the surname "Polo"', async function() {
      await browser.visit('/');
      await browser.fill('surname', 'Polo');
      await browser.pressButton('submit');

      browser.assert.text('span#name', 'Marco');
      browser.assert.text('span#surname', 'Polo');
      browser.assert.element('span#dates');
    });

  });

});