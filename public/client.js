(function () {
  const form = document.getElementById('f1');
  const input = document.getElementById('i1');
  const div = document.getElementById('tn');

  if (!form || !input || !div) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const surname = (input.value || '').trim();
    if (!surname) return;

    div.innerHTML = '<p>Loading...</p>';

    const xhr = new XMLHttpRequest();
    // usar PUT (server acepta PUT y POST). Si cambias el servidor, ajusta aquí.
    xhr.open('PUT', '/travellers', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (Math.floor(xhr.status / 100) === 2) {
        let data = {};
        try {
          data = JSON.parse(xhr.responseText);
        } catch (err) {
          data = {};
        }

        div.innerHTML =
          '<p>first name: <span id="name">' + (data.name || '') + '</span></p>' +
          '<p>last name: <span id="surname">' + (data.surname || '') + '</span></p>' +
          '<p>dates: <span id="dates">' + (data.dates || '') + '</span></p>';

        input.value = '';
      } else {
        div.innerHTML = '<p>Error loading data</p>';
        console.error('XHR error', xhr.status, xhr.responseText);
      }
    };

    xhr.send(JSON.stringify({ surname: surname }));
  });
})();

