import { ACTION, THEME, WINDOW } from '@/utils/tokens';
import handleState from '@/state/actions';
import { useDispatchContext, useThemeContext } from '@/hooks/State';
import { useEffect } from 'react';
import { useStorage } from '@lc-2025/storage-manager';
import { Switch } from '@headlessui/react';
import { TEST } from '@/utils/tokens';
import {
  TStyleIcon,
  TStyleMode,
  TThemeSwitcher,
} from '@/types/components/ThemeSwitcher';

/**
 * @description Theme switcher component
 * @author Luca Cattide
 * @param {TThemeSwitcher} {
 *   iconDark,
 *   iconLight,
 *   style,
 * }
 * @returns {*}  {React.ReactNode}
 */
const ThemeSwitcher = ({
  iconDark,
  iconLight,
  style,
}: TThemeSwitcher): React.ReactNode => {
  const { CONTAINER, SLIDER } = TEST.ID;
  const { LABEL } = THEME;
  const { LIGHT, DARK } = THEME.NAME;
  const dispatch = useDispatchContext();
  const { getStorage, setStorage } = useStorage();
  const themeSaved = getStorage(LABEL) ?? '';
  const theme = useThemeContext();

  useEffect(() => {
    initTheme();
  }, []);

  /**
   * @description Icon getter
   * @author Luca Cattide
   * @param {(React.ReactNode | TStyleIcon)} icon
   * @returns {*}  {React.ReactNode}
   */
  const getIcon = (icon: React.ReactNode | TStyleIcon): React.ReactNode => {
    let iconVersion: React.ReactNode;

    if ((icon as TStyleIcon).dark || (icon as TStyleIcon).light) {
      const iconCurrent = icon as TStyleIcon;

      iconVersion = isLightTheme(theme) ? iconCurrent.light : iconCurrent.dark;
    } else {
      iconVersion = icon as React.ReactNode;
    }

    return iconVersion;
  };

  /**
   * @description Theme selection getter
   * @author Luca Cattide
   * @param {boolean} isDark
   * @returns {*}  {string}
   */
  const getNewTheme = (isDark: boolean): string => (isDark ? DARK : LIGHT);

  /**
   * @description Custom style override getter
   * @author Luca Cattide
   * @param {(string | TStyleMode)} style
   * @returns {*}  {string}
   */
  const getStyle = (style: string | TStyleMode): string =>
    typeof style === 'string' ? style : (style.light ?? style.dark ?? '');

  /**
   * @description Theme initialization helper
   * @author Luca Cattide
   */
  const initTheme = (): void => {
    // User preference + system-aware detection
    const isDark =
      themeSaved === DARK || window.matchMedia(WINDOW.MEDIA.THEME.DARK).matches;

    handleState({ type: ACTION.THEME, element: getNewTheme(isDark) }, dispatch);
    enableTheme(isDark);
  };

  /**
   * @description Light theme helper
   * Verifies if the current theme is the light one
   * @author Luca Cattide
   * @param {string} theme
   * @returns {*}  {boolean}
   */
  const isLightTheme = (theme: string): boolean => theme === THEME.NAME.LIGHT;

  /**
   * @description Theme enabler helper
   * Activates the selected theme
   * @author Luca Cattide
   * @param {boolean} isDark
   */
  const enableTheme = (isDark: boolean): void => {
    if (isDark) {
      document.documentElement.classList.add(DARK);
    } else {
      document.documentElement.classList.remove(DARK);
    }
  };

  /**
   * @description Theme handler
   * Manages the theme acrivation and its persistence
   * @author Luca Cattide
   * @param {boolean} value
   */
  const handleTheme = (value: boolean): void => {
    enableTheme(value);

    const themeNew = getNewTheme(value);

    setStorage(LABEL, themeNew);
    handleState(
      {
        type: ACTION.THEME,
        element: themeNew,
      },
      dispatch,
    );
  };

  return (
    // Theme Switcher Start
    <div
      className={`theme-switcher ${(style && style.container) ?? 'flex items-center'}`}
      data-testid={CONTAINER}
    >
      <div
        className={`theme-switcher__icon theme-switcher__icon--light ${style && style.iconLight ? getStyle(style.iconLight) : 'mr-6 select-none'}`}
      >
        {getIcon(iconLight)}
      </div>
      <Switch
        aria-label="Switch Theme"
        checked={!isLightTheme(theme)}
        className={`theme-switcher__field group relative flex rounded-full p-1 ease-in-out focus:not-data-focus:outline-none data-focus:outline ${style && style.field ? getStyle(style.field) : `h-12 w-24 cursor-pointer ${isLightTheme(theme) ? 'bg-black/10 data-checked:bg-black/10 data-focus:outline-black' : 'bg-white/10 data-checked:bg-white/10 data-focus:outline-white'}`}`}
        data-testid={SLIDER}
        onChange={handleTheme}
        tabIndex={0}
      >
        <span
          aria-hidden="true"
          className={`field__switch pointer-events-none inline-block translate-x-0 rounded-full shadow-lg ring-0 transition duration-200 ease-in-out ${style && style.switch ? getStyle(style.switch) : `size-10 group-data-checked:translate-x-12 ${isLightTheme(theme) ? 'bg-black group-data-[checked]:bg-black' : 'bg-black group-data-[checked]:bg-white'}`}`}
        />
      </Switch>
      <div
        className={`theme-switcher__icon theme-switcher__icon--dark ${style && style.iconDark ? getStyle(style.iconDark) : 'ml-6 select-none'}`}
      >
        {getIcon(iconDark)}
      </div>
    </div>
    // Theme Switcher End
  );
};

export default ThemeSwitcher;
