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
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });

    
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });

    
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')

        .send({surname: "Colombo"})
        
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');

        

          done();
        });
    });

    
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')

        .send({surname: "da Verrazzano",
               name: "Giovanni"
              })

        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');

          done();
          });
    });
  });
});

  const Browser = require('zombie');

  Browser.site = 'https://boilerplate-mochachai-jycm.onrender.com'; 
  

  suite('Functional Tests with Zombie.js', function() {
     this.timeout(5000);
    
    const browser = new Browser();

    // Mocha allows You to prepare the ground running some code
    // before the actual tests. This can be useful for example to create
    // items in the database, which will be used in the successive tests.

    // With a headless browser, before the actual testing, we need to
    // **visit** the page we are going to inspect...
    // the suiteSetup 'hook' is executed only once at the suite startup.
    // Other different hook types can be executed before each test, after
    // each test, or at the end of a suite. See the Mocha docs for more infos.

    suiteSetup(function(done) { // Remember, web interactions are asynchronous !!
    return browser.visit('/', done);  // Browser asynchronous operations take a callback

  });
      
    suite('Headless browser', function () {
    test('should have a working "site" property', function() {
    assert.isNotNull(browser.site);
    });
      });
    
    

    suite('"Famous Italian Explorers" form', function() {
      
      // In the HTML main view we provided a input form.
      // It sends data to the "PUT /travellers" endpoint that we used above
      // with an Ajax request. When the request completes successfully the
      // client code appends a <div> containing the infos returned by the call
      // to the DOM. 
      
      
      
      test('Submit the surname "Colombo" in the HTML form', function(done) {

        // fill the form...
        // then submit it pressing 'submit' button.
        //
        // in the callback...
        // assert that status is OK 200
        // assert that the text inside the element 'span#name' is 'Cristoforo'
        // assert that the text inside the element 'span#surname' is 'Colombo'
        // assert that the element(s) 'span#dates' exist and their count is 1
        browser.fill('surname', 'Colombo');
        browser.pressButton('submit', function() {
            /** YOUR TESTS HERE, Don't forget to remove assert.fail() **/

            // pressButton is Async.  Waits for the ajax call to complete...

            // assert that status is OK 200
            
            browser.assert.success();
            // assert that the text inside the element 'span#name' is 'Cristoforo'
            browser.assert.text('span#name', 'Cristoforo');
            // assert that the text inside the element 'span#surname' is 'Colombo'
            browser.assert.text('span#surname', 'Colombo');
            // assert that the element(s) 'span#dates' exist and their count is 1
            // This should be "elements", not "element", but FCC's tests are flawed.
            // https://zombie.js.org/#assertelementselection-message
            browser.assert.elements('span#dates', 1);

            done();   // It's an async test, so we have to call 'done()''
       
        });
        });
      
      /** Try it again... No help this time **/
      test('Submit the surname "Vespucci" in the HTML form', function(done) {

        // fill the form, and submit.
        browser.fill('surname', 'Vespucci');
          browser.pressButton('submit', function()  {
            // assert that status is OK 200
           
            browser.assert.success();
            // assert that the text inside the element 'span#name' is 'Amerigo'
            browser.assert.text('span#name', 'Amerigo');
            // assert that the text inside the element 'span#surname' is 'Vespucci'
            browser.assert.text('span#surname', 'Vespucci');
            // assert that the element(s) 'span#dates' exist and their count is 1
            browser.assert.elements('span#dates', 1);
          
            done();

        
       
        });
        });
      
    });
    });
