function Utils() {
   this.ready = function (fn) {
      if (typeof fn !== 'function') return;
      if (document.readyState === 'complete') return fn();
      document.addEventListener('DOMContentLoaded', fn, false);
   };

   this.ajax = function (options, cb) {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4){
           if(Math.floor(xmlhttp.status/100) === 2) {
             let results = xmlhttp.responseText;
             let type = xmlhttp.getResponseHeader('Content-Type');
             if(type.match('application/json')) results = JSON.parse(results);
             cb(null, results);
           } else cb(xmlhttp);
         }
      };

      const method = options.method || 'get';
      let url = options.url || '/';
      if(url.charAt(url.length - 1) === '/') url = url.slice(0,url.length-1);

      if (options.data) {
        let query, contentType = "application/x-www-form-urlencoded";
        if(options.type === 'json') {
          query = JSON.stringify(options.data);
          contentType = "application/json";
        } else {
          query = [];
          for (let key in options.data) {
            query.push(key + '=' + encodeURIComponent(options.data[key]));
            query.push('&');
          }
          query.pop();
          query = query.join('');
        }

        xmlhttp.open(method, url, true);
        if(method.toLowerCase() !== 'get') xmlhttp.setRequestHeader("Content-type", contentType);
        xmlhttp.send(query);
      } else {
        xmlhttp.open(method, url, true);
        xmlhttp.send();
      }
   };
}

const utils = new Utils();

utils.ready(function() {
  const form = document.getElementById('f1');
  const input = document.getElementById('surname');
  const div = document.getElementById('tn');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value) {
      const options = {
        method: 'put',
        url: '/travellers',
        type: 'json',
        data: {surname: input.value}
      };
      div.innerHTML = '<p>Loading...</p>';
      utils.ajax(options, function(err, res) {
        if(err) return console.log(err);
        div.innerHTML = 
          '<p>first name: <span id="name">' + res.name + '</span></p>' +
          '<p>last name: <span id="surname">' + res.surname + '</span></p>' +
          '<p>dates: <span id="dates">' + res.dates + '</span></p>';
      });
    }
  });
});
