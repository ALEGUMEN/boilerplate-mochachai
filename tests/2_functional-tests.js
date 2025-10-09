const chai = require('chai');
const assert = chai.assert;
const Browser = require('zombie');

// Configura la URL de tu aplicación
Browser.site = 'https://boilerplate-mochachai-jycm.onrender.com';
const browser = new Browser();

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

  // Antes de ejecutar los tests, visita la página raíz
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser
        .fill('surname', 'Colombo')   // Llena el input con name="surname"
        .pressButton('submit', function() { // Presiona el botón con type="submit"
          assert.equal(browser.success, true, 'Form submission should be successful');
          assert.equal(browser.field('surname').value, 'Colombo', 'Input value should be Colombo');
          assert.include(browser.text('body'), 'Cristoforo', 'Response should contain Cristoforo');
          assert.include(browser.text('body'), 'Colombo', 'Response should contain Colombo');
          done();
        });
    });

    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser
        .fill('surname', 'Vespucci')
        .pressButton('submit', function() {
          assert.equal(browser.success, true, 'Form submission should be successful');
          assert.equal(browser.field('surname').value, 'Vespucci', 'Input value should be Vespucci');
          assert.include(browser.text('body'), 'Amerigo', 'Response should contain Amerigo');
          assert.include(browser.text('body'), 'Vespucci', 'Response should contain Vespucci');
          done();
        });
    });
  });
});
