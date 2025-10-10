# Theme Switcher

A theme style selector.

![Theme Switcher](./docs/preview.gif 'Theme Switcher')
[![Theme Switcher CI](https://github.com/lc-2025/theme-switcher/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/theme-switcher/actions/workflows/ci.yml) [![Theme Switcher CD](https://github.com/lc-2025/theme-switcher/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/theme-switcher/actions/workflows/cd.yml)

## About

TODO:

## Features

TODO:

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

TODO: (Please refer to the peer dependencies)

### Installation

On terminal, from project root:

```bash
# Assuming React already installed
# TODO: Insert tailwind notes about per-framework setup

npm i @lc-2025/theme-switcher @headlessui/react tailwindcss
```

### Configuration

TODO: Refactor/Update

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

TODO: Refactor/Update

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
