const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const Browser = require('zombie');
const server = require('../server');

chai.use(chaiHttp);

const browser = new Browser();
browser.site = 'https://boilerplate-mochachai-jycm.onrender.com';

suiteSetup(function(done) {
  this.timeout(5000);
  return browser.visit('/', done);
});

suite('Functional Tests with Zombie.js and Chai-HTTP', function() {
  this.timeout(10000);

  suite('"Famous Italian Explorers" form', function() {

    test('Submit the surname "Colombo" in the HTML form', function(done) {
      browser.fill('surname', 'Colombo').then(() => {
        browser.pressButton('submit', function() {

          // ✅ Assert status OK
          browser.assert.success();

          // ✅ Assert correct names
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');

          // ✅ Assert span#dates exists y solo hay uno
          browser.assert.elements('span#dates', 1);

          done(); // importante para tests asíncronos
        });
      });
    });

    test('Submit the surname "Vespucci" in the HTML form', function(done) {
      browser.fill('surname', 'Vespucci').then(() => {
        browser.pressButton('submit', function() {
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1);
          done();
        });
      });
    });

  });

});
