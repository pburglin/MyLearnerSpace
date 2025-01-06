export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'Learning Platform',
  defaultTheme: import.meta.env.VITE_DEFAULT_THEME || 'light',
  points: {
    perItem: parseInt(import.meta.env.VITE_POINTS_PER_ITEM) || 1,
    perPathCompletion: parseInt(import.meta.env.VITE_POINTS_PER_PATH_COMPLETION) || 10,
    authorPerPublication: parseInt(import.meta.env.VITE_AUTHOR_POINTS_PER_PUBLICATION) || 10,
    authorPerItemCompletion: parseInt(import.meta.env.VITE_AUTHOR_POINTS_PER_ITEM_COMPLETION) || 1,
    authorPerPathCompletion: parseInt(import.meta.env.VITE_AUTHOR_POINTS_PER_PATH_COMPLETION) || 3
  },
  rating: {
    max: parseInt(import.meta.env.VITE_MAX_RATING) || 5,
    default: parseInt(import.meta.env.VITE_DEFAULT_RATING) || 0
  }
}
