const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);       // ✅ Status 200
          assert.equal(res.text, 'hello Guest'); // ✅ Texto esperado
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);       // ✅ Status 200
          assert.equal(res.text, 'hello xy_z'); // ✅ Texto esperado
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: "Colombo" })          // ✅ Se manda el body
        .end(function (err, res) {
          assert.equal(res.status, 200);        // Status 200
          assert.equal(res.body.name, 'Cristoforo');  // Ejemplo de respuesta esperada
          assert.equal(res.body.surname, 'Colombo');
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
          done();
        });
    });
  });
});
