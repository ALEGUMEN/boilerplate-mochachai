const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);

  suite('Integration tests with chai-http', function () {
    test('GET /hello with no name', function (done) {
      chai.request(server)
        .get('/hello')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });

    test('GET /hello with name query', function (done) {
      chai.request(server)
        .get('/hello?name=xy_z')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });

    const testTraveller = (surname, expectedName, done) => {
      chai.request(server)
        .put('/travellers')
        .send({ surname })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, expectedName);
          assert.equal(res.body.surname, surname);
          done();
        });
    };

    test('PUT /travellers with {surname: "Colombo"}', function (done) {
      testTraveller('Colombo', 'Cristoforo', done);
    });

    test('PUT /travellers with {surname: "da Verrazzano"}', function (done) {
      testTraveller('da Verrazzano', 'Giovanni', done);
    });
  });
});


// -------------------- ZOMBIE.JS TESTS --------------------

const Browser = require('zombie');
Browser.site = 'https://boilerplate-mochachai-jycm.onrender.com'; // tu URL base
const browser = new Browser();

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

  suiteSetup(function (done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function () {
      assert.isNotNull(browser.site);
    });
  });

  const testForm = (surname, expectedName, done) => {
    browser.fill('surname', surname)
      .then(() => browser.pressButton('submit', () => {
        browser.assert.success();
        browser.assert.text('span#name', expectedName);
        browser.assert.text('span#surname', surname);
        browser.assert.elements('span#dates', 1);
        done();
      }));
  };

  suite('"Famous Italian Explorers" form', function () {
    test('Submit the surname "Colombo"', function (done) {
      testForm('Colombo', 'Cristoforo', done);
    });

    test('Submit the surname "Vespucci"', function (done) {
      testForm('Vespucci', 'Amerigo', done);
    });
  });
});
