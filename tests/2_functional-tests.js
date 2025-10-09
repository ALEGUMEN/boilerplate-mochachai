const chai = require('chai');
const assert = chai.assert;
const Browser = require('zombie');

// Configura la URL de tu aplicación
Browser.site = 'https://boilerplate-mochachai-jycm.onrender.com';

// Instancia el navegador Zombie
const browser = new Browser();

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000); // Establece un tiempo de espera de 5 segundos

  // Configura el hook para visitar la página principal antes de las pruebas
  suiteSetup(function(done) {
    browser.visit('/', done);
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function(done) {
      browser.fill('surname', 'Colombo').pressButton('submit', function() {
        browser.assert.success();
        browser.assert.text('span#name', 'Cristoforo');
        browser.assert.text('span#surname', 'Colombo');
        browser.assert.elements('span#dates', 1);
        done();
      });
    });

    // #6
    test('Submit the surname "Vespucci" in the HTML form', function(done) {
      browser.fill('surname', 'Vespucci').pressButton('submit', function() {
        browser.assert.success();
        browser.assert.text('span#name', 'Amerigo');
        browser.assert.text('span#surname', 'Vespucci');
        browser.assert.elements('span#dates', 1);
        done();
      });
    });
  });
});
