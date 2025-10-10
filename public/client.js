function Utils() {
  this.ready = function(fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'complete') return fn();
    document.addEventListener('DOMContentLoaded', fn, false);
  };

  this.ajax = function(options, cb) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (Math.floor(xmlhttp.status / 100) === 2) {
          let results = xmlhttp.responseText;
          const type = xmlhttp.getResponseHeader('Content-Type');
          if (type && type.includes('application/json')) {
            results = JSON.parse(results);
          }
          cb(null, results);
        } else {
          cb(xmlhttp);
        }
      }
    };

    const method = options.method || 'get';
    let url = options.url || '/';

    if (url.charAt(url.length - 1) === '/') url = url.slice(0, url.length - 1);

    let query = null;
    let contentType = 'application/x-www-form-urlencoded';

    if (options.data) {
      if (options.type === 'json') {
        query = JSON.stringify(options.data);
        contentType = 'application/json';
      } else {
        query = [];
        for (let key in options.data) {
          query.push(key + '=' + encodeURIComponent(options.data[key]));
        }
        query = query.join('&');
      }
    }

    if (['get'].includes(method.toLowerCase())) {
      if (query) url += '?' + query;
      xmlhttp.open(method, url, true);
      xmlhttp.send();
    } else {
      xmlhttp.open(method, url, true);
      xmlhttp.setRequestHeader('Content-type', contentType);
      xmlhttp.send(query);
    }
  };
}

const utils = new Utils();

utils.ready(function() {
  const form = document.getElementById('f1');
  const input = document.getElementById('i1');
  const div = document.getElementById('tn');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const surname = input.value;
    if (!surname) return;

    const options = {
      method: 'put',
      url: '/travellers',
      type: 'json',
      data: { surname: surname }
    };

    div.innerHTML = '<p>Loading...</p>';

    utils.ajax(options, function(err, res) {
      if (err) return console.log(err);

      div.innerHTML =
        '<p>first name: <span id="name">' + res.name + '</span></p>' +
        '<p>last name: <span id="surname">' + res.surname + '</span></p>' +
        '<p>dates: <span id="dates">' + res.dates + '</span></p>';
    });
  });
});
