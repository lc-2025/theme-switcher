import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TEST } from '@/utils/tokens';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeSwitcher from '@/components/ThemeSwitcher';

describe('Package Unit Testing', () => {
  const { CLASS, CHECKED, ID, STYLE } = TEST;
  const { CONTAINER, SLIDER, VARIANT } = ID;
  const componentDefault = (
    <ThemeSwitcher iconDark={<>Dark</>} iconLight={<>Light</>} />
  );
  const componentStyle = (
    <ThemeSwitcher iconDark={<>foo</>} iconLight={<>bar</>} style={STYLE} />
  );
  const componentVariant = (
    <ThemeSwitcher
      iconDark={{
        dark: (
          <span className={CLASS.DARK} data-testid={VARIANT.DARK}>
            Dark
          </span>
        ),
        light: <span>Dark</span>,
      }}
      iconLight={{
        dark: <span>Light</span>,
        light: (
          <span className={CLASS.LIGHT} data-testid={VARIANT.LIGHT}>
            Light
          </span>
        ),
      }}
    />
  );
  const { getByTestId } = screen;

  /**
   * @description Component assertion helper
   * @author Luca Cattide
   */
  const assertRender = (component: React.ReactNode): void => {
    render(<ThemeProvider>{component}</ThemeProvider>);
    expect(getByTestId(CONTAINER)).toBeInTheDocument();
  };

  /**
   * @description Theme switch assertion helper
   * @author Luca Cattide
   * @param {boolean} [dark]
   * @returns {*}  {Promise<void>}
   */
  const assertSwitch = async (dark?: boolean): Promise<void> => {
    assertRender(componentDefault);

    const slider = getByTestId(SLIDER);
    const user = userEvent.setup();

    await user.click(slider);

    if (dark) {
      expect(slider).toHaveAttribute(CHECKED);
    } else {
      expect(slider).not.toHaveAttribute(CHECKED);
    }
  };

  test('It renders the Theme Switcher', () => {
    assertRender(componentDefault);
  });
  test('It switches to Dark theme', async () => {
    await assertSwitch(true);
  });
  test('It switches back to Light theme', async () => {
    await assertSwitch();
  });
  test('It renders custom styles', () => {
    assertRender(componentStyle);
    expect(getByTestId(CONTAINER)).toHaveClass(STYLE.container);
  });
  test('It renders icon variants', () => {
    assertRender(componentVariant);
    expect(getByTestId(VARIANT.LIGHT)).toHaveClass(CLASS.LIGHT);
  });
});
