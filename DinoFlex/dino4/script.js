// ✅ JS файл для dino4

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
  applySafeStyles(playground, userStyles);
  checkPosition();
});

function applySafeStyles(element, styles) {
  const temp = document.createElement('div');
  temp.style.cssText = styles;

  const allowed = ['display', 'justify-content', 'align-items', 'flex-direction'];
  const forbidden = ['position', 'top', 'left', 'margin', 'transform'];

  // Повідомлення про помилку
  const message = document.getElementById('error-message') || document.createElement('div');
  message.id = 'error-message';
  message.style.color = '#ff4d4f';
  message.style.marginTop = '10px';

  const violations = forbidden.filter(prop => temp.style[prop]);

  if (violations.length > 0) {
    message.textContent = `Заборонено використовувати: ${violations.join(', ')}`;
    if (!document.body.contains(message)) {
      document.querySelector('.left-panel').appendChild(message);
    }
    return;
  } else {
    if (document.body.contains(message)) {
      message.remove();
    }
  }

  // Очищаємо попередні стилі
  allowed.forEach(prop => {
    element.style[prop] = '';
  });

  // Застосовуємо дозволені стилі
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

  const existingBtn = document.getElementById('next-button');

  if (overlap && !existingBtn) {
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
      window.location.href = 'dino5.html';
    });

    document.querySelector('.left-panel').appendChild(next);
  } else if (!overlap && existingBtn) {
    existingBtn.remove();
  }
}