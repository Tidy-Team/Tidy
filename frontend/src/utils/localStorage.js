export function LocalStorage() {
  const saveTheme = (theme) => {
    localStorage.setItem('theme', theme)
  }

  const loadTheme = () => {
    return localStorage.getItem('theme') || 'light'
  }

  return { saveTheme, loadTheme }
}
