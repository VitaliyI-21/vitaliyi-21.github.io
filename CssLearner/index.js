const taskMenu = document.getElementById('taskMenu');
const startButton = document.querySelector('.start-button');

function toggleMenu() {
  taskMenu.classList.toggle('open');
}

function goToHome() {
  window.location.href = 'main.html';
}

window.addEventListener('click', function (e) {
  const isClickInside = taskMenu.contains(e.target) || 
                        e.target.classList.contains('menu-button') || 
                        startButton.contains(e.target);

  if (!isClickInside) {
    taskMenu.classList.remove('open');
  }
});
