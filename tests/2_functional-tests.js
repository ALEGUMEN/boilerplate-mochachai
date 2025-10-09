const Browser = require('zombie');
Browser.site = 'https://boilerplate-mochachai-jycm.onrender.com';

const browser = new Browser();

suite('Functional Tests with Zombie.js', function() {
  this.timeout(10000);  // aumentar tiempo por si Render tarda

  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Guest', 'Response should be "hello John"');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello xy_z', 'Response should be "hello John"');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
    .request(server)
    .put('/travellers')
    /** send {surname: 'Colombo'} here **/
    .send({ surname: 'Colombo' })
    // .send({...})
    .end(function(err, res) {
      /** your tests here **/
      assert.equal(res.status, 200, 'response status should be 200');
      assert.equal(res.type, 'application/json', 'Response should be json');
      assert.equal(
        res.body.name,
        'Cristoforo',
        'res.body.name should be "Christoforo"'
      );
      assert.equal(
        res.body.surname,
        'Colombo',
        'res.body.surname should be "Colombo"'
      );

      done(); // Never forget the 'done()' callback...
        });
    });
    // #4
test('send {surname: "da Verrazzano"}', function(done) {
  /** place the chai-http request code here... **/
  chai
    .request(server)
    .put('/travellers')
    .send({ surname: 'da Verrazzano' })
    /** place your tests inside the callback **/
    .end(function(err, res) {
      assert.equal(res.status, 200, 'response status should be 200');
      assert.equal(res.type, 'application/json', 'Response should be json');
      assert.equal(res.body.name, 'Giovanni');
      assert.equal(res.body.surname, 'da Verrazzano');

      done();
    });
});

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      assert.fail();

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      assert.fail();

      done();
        });
      });
    });
  });
});
