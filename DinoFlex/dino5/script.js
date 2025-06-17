// dino5 - script.js (з поверненим меню)

const textarea = document.getElementById('code');
const playground = document.getElementById('playground');
const dino = document.querySelector('.dino');
const food = document.querySelector('.food');
const taskMenu = document.getElementById('taskMenu');

function toggleMenu() {
  taskMenu.classList.toggle('open');
}

window.addEventListener('click', function (e) {
  if (!taskMenu.contains(e.target) && !e.target.classList.contains('menu-button')) {
    taskMenu.classList.remove('open');
  }
});

document.querySelectorAll('#taskMenu a').forEach(link => {
  link.addEventListener('click', () => {
    taskMenu.classList.remove('open');
  });
});

textarea.addEventListener('input', () => {
  const userStyles = textarea.value;
  applyGridStyles(dino, userStyles);
  checkOverlap();
});

function applyGridStyles(element, styles) {
  const temp = document.createElement('div');
  temp.style.cssText = styles;
  const allowed = ['grid-column', 'grid-row', 'place-self', 'justify-self', 'align-self'];

  allowed.forEach(prop => {
    if (temp.style[prop]) {
      element.style[prop] = temp.style[prop];
    }
  });
}

function checkOverlap() {
  const dinoRect = dino.getBoundingClientRect();
  const foodRect = food.getBoundingClientRect();

  const overlap = !(
    dinoRect.right < foodRect.left ||
    dinoRect.left > foodRect.right ||
    dinoRect.bottom < foodRect.top ||
    dinoRect.top > foodRect.bottom
  );

  const existing = document.getElementById('next-button');

  if (overlap) {
    if (!existing) {
      const next = document.createElement('button');
      next.id = 'next-button';
      next.textContent = 'Далі';
      next.style.marginTop = '10px';
      next.style.padding = '10px 20px';
      next.style.fontSize = '16px';
      next.style.fontWeight = 'bold';
      next.style.backgroundColor = '#fff';
      next.style.color = '#4caf50';
      next.style.border = '2px solid #4caf50';
      next.style.borderRadius = '6px';
      next.style.cursor = 'pointer';

      next.addEventListener('click', () => {
        window.location.href = 'dino6.html';
      });

      document.querySelector('.left-panel').appendChild(next);
    }
  } else {
    if (existing) existing.remove();
  }
}
