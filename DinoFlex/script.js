const textarea = document.getElementById('code');
const playground = document.getElementById('playground');
const dino = document.querySelector('.dino');
const food = document.querySelector('.food');
const runButton = document.getElementById('run');
const hintButton = document.getElementById('hint');
const checkButton = document.getElementById('check');
const preview = document.getElementById('preview');
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const result = document.getElementById('result');
const taskMenu = document.getElementById('taskMenu');

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  if (tab === 'html') {
    htmlCode.style.display = 'block';
    cssCode.style.display = 'none';
    document.querySelectorAll('.tab')[0].classList.add('active');
  } else {
    htmlCode.style.display = 'none';
    cssCode.style.display = 'block';
    document.querySelectorAll('.tab')[1].classList.add('active');
  }
}

function goToHome() {
  window.location.href = '../main.html';
}

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
  applySafeStyles(dino, userStyles);
  checkPosition();
});

function applySafeStyles(element, styles) {
  const temp = document.createElement('div');
  temp.style.cssText = styles;
  const allowed = ['top', 'left', 'right', 'bottom', 'transform', 'position', 'margin', 'translate'];
  allowed.forEach(prop => {
    if (temp.style[prop]) {
      element.style[prop] = temp.style[prop];
    }
  });
}

function checkPosition() {
  const dinoRect = dino.getBoundingClientRect();
  const foodRect = food.getBoundingClientRect();

  const overlap = !(
    dinoRect.right < foodRect.left ||
    dinoRect.left > foodRect.right ||
    dinoRect.bottom < foodRect.top ||
    dinoRect.top > foodRect.bottom
  );

  if (overlap) {
    if (!document.getElementById('next-button')) {
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
        window.location.href = 'next-level.html';
      });

      document.querySelector('.left-panel').appendChild(next);
    }
  } else {
    const next = document.getElementById('next-button');
    if (next) next.remove();
  }
}
