const form = document.getElementById('f1');
const input = document.getElementById('i1');
const div = document.getElementById('tn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const surname = input.value;
  if (!surname) return;

  div.innerHTML = '<p>Loading...</p>';

  try {
    const res = await fetch('/travellers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ surname }),
    });

    const data = await res.json();

    div.innerHTML =
      `<p>first name: <span id="name">${data.name}</span></p>` +
      `<p>last name: <span id="surname">${data.surname}</span></p>` +
      `<p>dates: <span id="dates">${data.dates}</span></p>`;
  } catch (err) {
    div.innerHTML = '<p>Error loading data</p>';
    console.error(err);
  }
});
