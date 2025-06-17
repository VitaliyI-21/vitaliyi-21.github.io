const textarea = document.getElementById('code');
const playground = document.getElementById('playground');
const dino = document.querySelector('.dino');
const food = document.querySelector('.food');
const taskMenu = document.getElementById('taskMenu');

// Обробка меню
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

// Застосування стилів
textarea.addEventListener('input', () => {
  const userStyles = textarea.value;
  applySafeStyles(dino, userStyles);
  checkPosition();
});

// Функція застосування стилів із межами
function applySafeStyles(element, styles) {
  const temp = document.createElement('div');
  temp.style.cssText = styles;

  const allowed = ['top', 'left', 'right', 'bottom', 'transform', 'position'];
  allowed.forEach(prop => {
    if (temp.style[prop]) {
      element.style[prop] = temp.style[prop];
    }
  });

  const dinoRect = element.getBoundingClientRect();
  const playgroundRect = playground.getBoundingClientRect();

  let corrected = false;

  if (dinoRect.left < playgroundRect.left) {
    element.style.left = '0px';
    corrected = true;
  }

  if (dinoRect.top < playgroundRect.top) {
    element.style.top = '0px';
    corrected = true;
  }

  if (dinoRect.right > playgroundRect.right) {
    const maxLeft = playground.clientWidth - element.clientWidth;
    element.style.left = maxLeft + 'px';
    corrected = true;
  }

  if (dinoRect.bottom > playgroundRect.bottom) {
    const maxTop = playground.clientHeight - element.clientHeight;
    element.style.top = maxTop + 'px';
    corrected = true;
  }

  showWarning(corrected);
}

// Повідомлення користувачу
function showWarning(corrected) {
  let warning = document.getElementById('boundary-warning');
  if (!corrected) {
    if (warning) warning.remove();
    return;
  }

  if (!warning) {
    warning = document.createElement('div');
    warning.id = 'boundary-warning';
    warning.textContent = 'Динозавр не може виходити за межі поля!';
    warning.style.background = '#fff3cd';
    warning.style.color = '#856404';
    warning.style.border = '1px solid #ffeeba';
    warning.style.padding = '10px';
    warning.style.marginTop = '15px';
    warning.style.borderRadius = '6px';
    warning.style.fontWeight = 'bold';
    document.querySelector('.left-panel').appendChild(warning);
  }
}

// Перевірка перетину
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
