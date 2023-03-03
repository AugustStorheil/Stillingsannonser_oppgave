// Hent eksisterende stillinger fra local storage hvis de finnes
const storedPositions = JSON.parse(localStorage.getItem('positions')) || [];

// Funksjon for å legge til stilling i listen og i local storage
function addPositionToList(event) {
  // Forhindre at skjemaet sendes
  event.preventDefault();

  // Hent verdier fra skjemaet
  const title = document.getElementById('title').value;
  const deadline = document.getElementById('deadline').value;
  const info = document.getElementById('info').value;

  // Opprett en ny stilling
  const position = { title, deadline, info };

  // Legg til den nye stillingen i listen
  positions.push(position);
  renderPositionList();

  // Tøm skjemaet
  document.getElementById('title').value = '';
  document.getElementById('deadline').value = '';
  document.getElementById('info').value = '';

  // Sett fokus på tittel-feltet
  document.getElementById('title').focus();
}

// Funksjon for å vise stillingslisten
function renderPositionList() {
  const positionList = document.getElementById('position-list');

  // Tøm listen før vi legger til nye stillinger
  positionList.innerHTML = '';

  // Legg til stillingene i listen
  positions.forEach((position, index) => {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const deadlineSpan = document.createElement('span');
    const p = document.createElement('p');
    const deleteButton = document.createElement('button');

    h3.textContent = position.title;
    deadlineSpan.textContent = position.deadline;
    p.textContent = position.info;
    deleteButton.textContent = 'Slett';

    deleteButton.addEventListener('click', () => {
      positions.splice(index, 1);
      renderPositionList();
    });

    li.appendChild(h3);
    li.appendChild(deadlineSpan);
    li.appendChild(p);
    li.appendChild(deleteButton);
    positionList.appendChild(li);
  });
}

// Funksjon for å lagre stillingene i local storage
function savePositions() {
  localStorage.setItem('positions', JSON.stringify(positions));
}

const positions = storedPositions;

// Hent stillinger fra local storage og vis dem på siden
renderPositionList();

// Legg til event listeners
document.getElementById('add-position').addEventListener('click', addPositionToList);
document.getElementById('save-positions').addEventListener('click', savePositions);
document.getElementById('password-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const password = document.getElementById('password').value;
  if (password === 'August') {
    document.getElementById('password-form').style.display = 'none';
    document.getElementById('position-form').style.display = 'block';
  } else {
    alert('Feil passord!');
  }
});