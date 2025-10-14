const ERROR = {
  CONTEXT: 'Context must be used within a `Provider`',
};
const TEST = {
  CLASS: {
    DARK: 'icon-dark--dark',
    LIGHT: 'icon-light--light',
  },
  CHECKED: 'data-checked',
  ID: {
    CONTAINER: 'test-container',
    SLIDER: 'test-slider',
    VARIANT: {
      DARK: 'test-dark',
      LIGHT: 'test-light',
    },
  },
  STYLE: {
    container: 'my-container',
  },
};
const THEME = {
  LABEL: 'theme',
  NAME: {
    LIGHT: 'light',
    DARK: 'dark',
  },
};
const ACTION = {
  THEME: THEME.LABEL,
  RESET: '',
};
const STATE_DEFAULT = {
  THEME: THEME.NAME.LIGHT,
};
const STATE = {
  theme: STATE_DEFAULT.THEME,
};
const WINDOW = {
  MEDIA: {
    THEME: {
      LIGHT: '(prefers-color-scheme: light)',
      DARK: '(prefers-color-scheme: dark)',
    },
  },
};

export { ACTION, ERROR, STATE, TEST, THEME, WINDOW };
