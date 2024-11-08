export function LocalStorage() {
  const saveTheme = (theme) => {
    localStorage.setItem('theme', theme)
  }

  const loadTheme = () => {
    const theme = localStorage.getItem('theme')
    if (theme) {
      return theme
    }
    // Return system theme if no theme is set
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'cupcake'
  }
  return { saveTheme, loadTheme }
}
