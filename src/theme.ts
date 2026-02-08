// Theme switcher implementation
const themeSwitcher = document.getElementById('theme-switcher');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeSwitcher?.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  let newTheme: string;

  // 循環切換：light -> dark -> terminal -> light
  switch (currentTheme) {
    case 'dark':
      newTheme = 'terminal';
      break;
    case 'terminal':
      newTheme = 'light';
      break;
    default:
      newTheme = 'dark';
  }

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme: string): void {
  const icon = themeSwitcher?.querySelector('i');
  if (!icon) return;

  // 移除舊的所有圖標類
  icon.classList.remove('bi-sun-fill', 'bi-moon-fill', 'bi-terminal');

  // 根據主題添加新的圖標
  switch (theme) {
    case 'dark':
      icon.classList.add('bi-moon-fill');
      break;
    case 'terminal':
      icon.classList.add('bi-terminal');
      break;
    default: // light
      icon.classList.add('bi-sun-fill');
  }
}

export { };
