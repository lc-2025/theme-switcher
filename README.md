# Theme Switcher

## TODO:

```bash
# Assuming React already installed

npm i @lc-2025/theme-switcher @headlessui-react tailwindcss
```

```js
// tailwindcss.config.js

const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Include Theme Switcher classes as well
    './node_modules/@lc-2025/theme-switcher/**/*.js',
  ],
  // Enable Dark-Mode support via class
  darkMode: 'class',
};

export default config;
```

```css
/* index.css  */

@import 'tailwindcss';

/* Register Theme Switcher as source */
@source "../node_modules/@lc-2025/theme-switcher/dist";

/* Override default configuration to detect the `.dark` class */
@custom-variant dark (&:where(.dark, .dark *));

/* ... */

/* Custom Dark-Mode rules */
.dark {
  background-color: #333;
}
```
