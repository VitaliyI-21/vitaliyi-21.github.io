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

runButton.addEventListener('click', () => {
  const html = htmlCode.value;
  const css = cssCode.value;
  preview.srcdoc = `<style>${css}</style>${html}`;
  result.textContent = '';
});

hintButton.addEventListener('click', () => {
  let hintText = document.getElementById('hint-text');
  if (!hintText) {
    hintText = document.createElement('div');
    hintText.id = 'hint-text';
    hintText.style.marginTop = '10px';
    hintText.style.color = '#ffd700';
    hintText.textContent = 'Підсказка: .hidden { display: none; }';
    result.insertAdjacentElement('beforebegin', hintText);
  } else {
    hintText.style.display = 'block';
  }
});

checkButton.addEventListener('click', () => {
  const html = htmlCode.value;
  const css = cssCode.value;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const div = doc.querySelector('div.hidden');
  const displayMatch = css.match(/\.hidden\s*{[^}]*display\s*:\s*none/i);

  if (div && displayMatch) {
    result.textContent = 'Правильно!';

    let nextBtn = document.getElementById('next-task-btn');
    if (!nextBtn) {
      nextBtn = document.createElement('button');
      nextBtn.id = 'next-task-btn';
      nextBtn.textContent = 'Далі';
      nextBtn.style.marginLeft = '10px';
      nextBtn.style.padding = '5px 15px';
      nextBtn.style.backgroundColor = '#28a745';
      nextBtn.style.color = '#fff';
      nextBtn.style.border = 'none';
      nextBtn.style.borderRadius = '4px';
      nextBtn.style.cursor = 'pointer';
      checkButton.insertAdjacentElement('afterend', nextBtn);

      nextBtn.addEventListener('click', () => {
        const currentPath = window.location.pathname;
        const match = currentPath.match(/\/([^\/]+)\/Q(\d+)\.html$/);
        if (match) {
          const folder = match[1];
          const nextNumber = parseInt(match[2]) + 1;
          window.location.href = `../Q${nextNumber}/Q${nextNumber}.html`;
        } else {
          window.location.href = '../Q25/Q25.html';
        }
      });
    }
  } else {
    result.textContent = 'Спробуй ще раз...';
    const nextBtn = document.getElementById('next-task-btn');
    if (nextBtn) nextBtn.remove();
  }
});
