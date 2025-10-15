# Theme Switcher

A theme style selector.

![Theme Switcher](./docs/preview.gif 'Theme Switcher')
[![Theme Switcher CI](https://github.com/lc-2025/theme-switcher/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/theme-switcher/actions/workflows/ci.yml) [![Theme Switcher CD](https://github.com/lc-2025/theme-switcher/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/theme-switcher/actions/workflows/cd.yml)

## About

_Theme Switcher_ is a stateful _React_ component based on _TailwindCSS_ and _HeadlessUI_ agnostic library for Light and Dark theme management.
A totally customizable and adaptable ready-to-go utility provided as a _NPM_ package to speed up the workflow.

## Features

- Personalizable layout and template
- Theme state and storage management
- Evironmental auto-detection (system & browser-based)

## Stack

- **Languages**: JavaScript, Typescript, YAML, Bash
- **Environments**: DOM
- **Libraries**: Storage Manager, HeadlessUI, Testing Library
- **Frameworks**: React, TailwindCSS, Jest
- **Linters/Plugins**: ESLint, Prettier
- **Compilers**: Babel, TypeScript
- **Bundlers**: Rollup
- **Testing**: Jest, Testing Library
- **Versioning**: GitHub, Husky
- **Continuous-Integration/Delivery**: GitHub Actions
- **Deployment**: NPM Registry

## Getting Started

The package production version is available on _NPM_ at [https://npmjs.com/package/@lc-2025/theme-switcher](https://npmjs.com/package/@lc-2025/theme-switcher).
For any contribution, maintanance and/or trial needs, please refer to the following specifications.

### Requirements

_Theme Switcher_ is based on _React_, _TailwindCSS_ and _HeadlessUI_ libraries to provide its features.
Please be sure to include these peer dependencies in your setup process.

### Installation

On terminal, from project root:

```bash
# Assuming React already installed

npm i @lc-2025/theme-switcher tailwindcss @headlessui/react
```

### Configuration

- Update the _TailwindCSS_ configuration:

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

- Update the global CSS file:

```css
/* i.e. {global|index}.css  */

/* Import TailwindCSS */
@import 'tailwindcss';

/**
* Register Theme Switcher as source
* Please note that the path is relative to file location, i.e.
* - <root>/src/style.css -> @source "../node_modules/...
*/
@source "../node_modules/@lc-2025/theme-switcher/dist";

/* Override the default configuration */
@custom-variant dark (&:where(.dark, .dark *));

/* ... */
```

- Update the Root component:

```jsx
// i.e. {main.js}

// ...

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Include the Theme Switcher Context provider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

### Usage

- Define your CSS variables/rules:

```css
/* i.e. {global|index}.css  */

/* ... */

@theme {
  --black: #000;
  --white: #fff;
  --color-primary: var(--black);
  --color-accent: var(--white);
}

/* Custom Dark-Mode rules */
.dark {
  --color-primary: var(--white);
  --color-accent: var(--black);

  background-color: var(--color-accent);
  color: var(--color-primary);
}

/* ... */
```

- Include _Theme Switcher_ in your App (basic usage):

```jsx
// MyComponent.jsx

import { useEffect } from 'react';
import { ThemeSwitcher, useThemeContext } from '@lc-2025/theme-switcher';

const MyComponent = () => {
  // Styles definition
  const style = {
    // Pass class names to style properties
    iconLight: 'my-light-icon',
    iconDark: 'my-dark-icon',
  };
  // i.e. Check selected theme
  const theme = useThemeContext();

  useEffect(() => {
    console.log(theme);
  });

  /**
   * Icons
   * May be any valid JSX/TSX element, i.e.:
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

#### Advanced usage

- With _TailwindCSS_:

```jsx
// MyComponent.jsx

  // ...

  /**
   * Styles definition
   * Theme Switcher is built upon a default style as fallback
   * Declare TailwindCSS classes or your custom ones to
   * change the component layout/template.
   * i.e. Default approach: TailwindCSS classes
   */
  const styleOverride = {
    container: 'flex items-center mt-8',
    field: 'h-8 w-14 bg-blue-300 data-checked:bg-blue-300 data-focus:outline-blue-300',
    iconLight: 'font-bold mr-4 uppercase',
    iconDark: 'font-bold ml-4 uppercase',
    switch: 'bg-blue-600 group-data-[checked]:bg-blue-600 group-data-checked:translate-x-6 size-6'
  };

  // ...

  return (
    //...
    {/* Styles override */}
    <ThemeSwitcher
      iconDark={<>Dark</>}
      iconLight={<>Light</>}
      style={styleOverride}
    />
    //...
  );
```

- With Custom classes:

```css
/* MyComponent.css */

.my-container {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 2rem 0 0;
  text-align: center;

  .my-field {
    height: 3rem;
    margin: 0.5rem 0;
    width: 6rem;

    &.my-field--dark {
      border: 2px dotted var(--color-primary);
    }

    &.my-field--light {
      border: 1px solid var(--color-primary);
    }
  }

  .my-icon-dark {
    align-self: flex-end;

    &.my-icon-dark--dark {
      font-weight: bold;
    }

    &.my-icon-dark--light {
      font-weight: normal;
    }
  }

  .my-icon-light {
    font-style: italic;
  }
}
```

```jsx
// MyComponent.jsx

/**
 * Assuming MyComponent.{css|jsx} under:
 * - <root>/css/MyComponent.css
 * - <root>/components/MyComponent.jsx
 */
import '../css/MyComponent.css';

  // ...

  const styleCustom = {
    // Total custom
    container: 'my-container',
    field: {
      // Or mixed (Tailwind/Custom)
      dark: 'my-field my-field--dark bg-red-300 data-checked:bg-red-300 data-focus:outline-red-300',
      light: 'my-field my-field--light bg-yellow-300 data-checked:bg-yellow-300 data-focus:outline-yellow-300'
    },
    iconDark: {
      dark: 'my-icon-dark my-icon-dark--dark',
      light: 'my-icon-dark my-icon-dark--light'
    },
    iconLight: {
      light: 'my-icon-light'
    },
  };

  // ...

  return (
    //...
    {/* Custom styles */}
    <ThemeSwitcher
      iconDark={<>Dark</>}
      iconLight={<>Light</>}
      style={styleCustom}
    />
    //...
  );
```

- With default classes:

```css
/* i.e. {global|index|MyComponent}.css  */

/* Default CSS classes reference */

/* Container */
.theme-switcher {
  /* ... */

  /* Switch */
  .theme-switcher__field {
    /* ... */

    /* Slider */
    .field__switch {
      /* ... */
    }
  }

  /* Icon - Base */
  .theme-switcher__icon {
    /* ... */
  }

  /* Dark variant */
  .theme-switcher__icon--dark {
    /* ... */
  }

  /* Light variant */
  .theme-switcher__icon--light {
    /* ... */
  }
}

/* ... */
```

```jsx
// MyComponent.jsx

/**
 * With custom CSS file only
 *
 * Assuming MyComponent.{css|jsx} under:
 * - <root>/css/MyComponent.css
 * - <root>/components/MyComponent.jsx
 */
import '../css/MyComponent.css';

// ...

return (
  //...
  <ThemeSwitcher iconDark={<span>foo</span>} iconLight={<span>bar</span>} />
  //...
);
```

- Icon variants:

```jsx
// MyComponent.jsx

  // ...

  const theme = useThemeContext();

  // ...

  return (
    //...
    {/* Different icons according to the current theme */}
    <ThemeSwitcher
      iconDark={{
        // Explicit definition
        dark: <>{'>8-|'}</>,
        light: <>{'D:-)'}</>
      }}
      iconLight={
        // Conditional rendering
        theme === 'light' ?
          <h2>Light</h2> :
          <>☀️</>
      }
    />
    //...
  );
```

### API

#### Props

- `iconDark`

  ```ts
  ReactNode | { darkIcon?: ReactNode, lightIcon?: ReactNode }
  ```

  Defines the dark theme icon or its variants

- `iconLight`

  ```ts
  ReactNode | { darkIcon?: ReactNode, lightIcon?: ReactNode }
  ```

  Defines the light theme icon or its variants

- `style` (optional)

  [See below](#style)

  Defines the component CSS classes

#### Style

- `container` (optional)

  ```ts
  string;
  ```

  Defines the component container

- `field` (optional)

  ```ts
  { dark?: ReactNode, light?: ReactNode }
  ```

  Defines the component `Switch` child (slider backgorund) variants

- `iconDark` (optional)

  ```ts
  { dark?: ReactNode, light?: ReactNode }
  ```

  Defines the component dark icon variants

- `iconLight` (optional)

  ```ts
  { dark?: ReactNode, light?: ReactNode }
  ```

  Defines the component light icon variants

- `switch` (optional)

  ```ts
  { dark?: ReactNode, light?: ReactNode }
  ```

  Defines the component slider child variants

## Contributing

### Setting Up

On terminal, from project root:

- To install dependencies

```bash
npm run install
```

- To lint the sources

```bash
npm run lint
```

- To build the production version

```bash
npm run build
```

### Tests

#### Unit

On terminal, from project root:

- To run the unit tests in `development` mode

```bash
npm run test
```

- To run the tests in `testing` mode (staging or content-integration/delivery environments)

```bash
npm run test:ci
```

### Deploy

_Theme Switcher_ is integrated and delivered to production via _GitHub Actions_ workflows pipeline, where the package is being set up, tested and built.
Then the artifacts are deployed on _NPM_ registry available at [https://npmjs.com/package/@lc-2025/theme-switcher](https://npmjs.com/package/@lc-2025/theme-switcher).

- To deploy the production version

```bash
npm run deploy
```

Please read more about required best practices on the specific [contributing reference document](./.github/CONTRIBUTING.md).
