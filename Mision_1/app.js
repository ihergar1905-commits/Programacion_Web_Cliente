// Variables de estado
let score = 0; // variable para la puntuación
let timeLeft = 15; // Define la duración inicial 
let gameInterval = null; // identificador del temporizador del reloj principal
let bugTimeout = null; // el temporizador del salto automático del bug
let bugType = 'normal'; // Guarda el tipo actual: 'normal', 'trap' o 'golden'

// Selección de elementos del DOM
const scoreEl = document.querySelector('#score');
const timerEl = document.querySelector('#timer');
const bugEl = document.querySelector('#bug');
const startBtn = document.querySelector('#startBtn');
const codeBoard = document.querySelector('#codeBoard');
const statusMessage = document.querySelector('#statusMessage');
const themeNotice = document.querySelector('#themeNotice');

// Función para iniciar el juego
function startGame() {
  score = 0;
  timeLeft = 15;

  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  statusMessage.textContent = '¡Caza los bugs 🐛! Ojo a los Dorados 🌟 y evita las Arañas 🕷️';

  startBtn.disabled = true;
  bugEl.classList.remove('hidden');

  moveBug();

  // Cuenta atrás global de la partida
  gameInterval = setInterval(updateTimer, 1000);
}

// Función para mover el bug y decidir qué tipo de insecto aparece
function moveBug() {
  
  // Cancelamos el temporizador de movimiento anterior
  clearTimeout(bugTimeout);

  const maxX = codeBoard.clientWidth - 40;
  const maxY = codeBoard.clientHeight - 40;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  // aqui se muestra las coordenadas ya calculadas en el CSS
  bugEl.style.left = randomX + 'px';
  bugEl.style.top = randomY + 'px';

  // Reseteamos las clases especiales para que no se acumulen los efectos
  bugEl.classList.remove('bug-trap', 'golden-bug');

  // Probabilidades y tiempo de permanencia según el tipo
  const chance = Math.random();
  let duration = 1000; // Tiempo por defecto (1 segundo)

  if (chance < 0.10) {
    // 10% de probabilidad: Bug Dorado (Rápido y difícil)
    bugType = 'golden';
    bugEl.textContent = '🌟';
    bugEl.classList.add('golden-bug');
    duration = 500; // ¡Solo dura 0.5 segundos!

  } else if (chance < 0.30) {
    // 20% de probabilidad: Araña Trampa
    bugType = 'trap';
    bugEl.textContent = '🕷️';
    bugEl.classList.add('bug-trap');
    duration = 1000;

  } else {
    // 70% de probabilidad: Bug Normal
    bugType = 'normal';
    bugEl.textContent = '🐛';
    duration = 1000;
  }

  // Si no se pulsa en el tiempo indicado (duration), salta solo
  bugTimeout = setTimeout(moveBug, duration);
}

// Función al hacer clic en el elemento
function catchBug() {
  if (bugType === 'golden') {
    score = score + 3;
    statusMessage.textContent = '⚡ ¡REFLEJO INCREÍBLE! Bug Dorado +3 Puntos';
  } else if (bugType === 'trap') {
    score = score - 2;
    statusMessage.textContent = '⚠️ ¡CAÍSTE EN LA TRAMPA! -2 Puntos';
  } else {
    score = score + 1;
    statusMessage.textContent = '🎯 ¡Bug cazado! +1 Punto';
  }

  scoreEl.textContent = score;
  moveBug(); // Salta de inmediato tras hacer clic
}

// Función para actualizar la cuenta atrás
function updateTimer() {
  timeLeft = timeLeft - 1;
  timerEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

// Función al terminar el juego
function endGame() {
  clearInterval(gameInterval); // Detiene el reloj global
  clearTimeout(bugTimeout); // Detiene el salto automático
  
  bugEl.classList.add('hidden');
  startBtn.disabled = false;
  statusMessage.textContent = '¡Fin del juego! Puntuación final: ' + score + ' puntos.';
}

// Escuchadores de eventos
// "Si en algún momento el usuario presiona el botón del ratón justo encima de la zona que ocupa bugEl, despiértame e invoca catchBug()".
startBtn.addEventListener('click', startGame);
bugEl.addEventListener('click', catchBug);

// BONUS: Escuchador de teclado para el modo oscuro con la tecla 'D'
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'd') {
    document.body.classList.toggle('dark-mode');

    // Cambia dinámicamente el mensaje según el estado activo
    if (document.body.classList.contains('dark-mode')) {
      themeNotice.textContent = "🌙 Modo Oscuro ACTIVADO (Pulsa 'D' para desactivar)";
    } else {
      themeNotice.textContent = "💡 Truco: Pulsa la tecla 'D' para activar el modo oscuro";
    }
  }
});