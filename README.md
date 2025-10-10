# Theme Switcher

## TODO:

## Getting Started

### Requirements

(Please refer to the peer dependencies)

### Installation

```bash
# Assuming React already installed
# TODO: Insert tailwind notes about per-framework setup

npm i @lc-2025/theme-switcher @headlessui/react tailwindcss
```

### Configuration

```js
// tailwind.config.js

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

/**
* Register Theme Switcher as source
* Please note that the path is relative to file location, i.e.
- <root>/src/style.css -> @source "../node_modules/...
*/
@source "../node_modules/@lc-2025/theme-switcher/dist";

/* Override default configuration to detect the `.dark` class */
@custom-variant dark (&:where(.dark, .dark *));

/* ... */

/* Custom Dark-Mode rules */
.dark {
}

/* Default classes reference */
.theme-switcher {
  .theme-switcher__field {
    .field__switch {
    }
  }

  .theme-switcher__icon {
  }

  .theme-switcher__icon--dark {
  }

  .theme-switcher__icon--light {
  }
}

/* ... */
```

### Usage

```css
/* MyComponent.css */

::root {
  --white: #fff;
}

html {
  background-color: var(--white);
}

.dark {
  background-color: #333;
}

/* Custom styles */
.my-dark-icon {
  color: var(--white);
}

.my-light-icon {
  color: grey;
}

/* ... */
```

```js
// MyComponent

import { ThemeSwitcher, useThemeContext } from '@lc-2025/theme-switcher';

const MyComponent = () => {
  // Styles definition
  const style = {
    iconLight: 'my-light-icon',
    iconDark: 'my-dark-icon',
  };

  // i.e. check selected theme
  const theme = useThemeContext();

  useEffect(() => {
    console.log(theme);
  });

  /**
   * Icons
   * May be any valid JSX element, i.e.:
   * - Icon library nodes
   * - Custom components
   * - Native DOM nodes
   * - Etc.
   */
  const iconDark = () => <>foo</>;

  // ...

  return (
    //...
    <ThemeSwitcher
      iconDark={iconDark}
      iconLight={<span>bar</span>}
      style={style}
    />
    //...
  );
};
```
