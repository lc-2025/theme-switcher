import { useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useStorage } from '@lc-2025/storage-manager';
import { useDispatchContext, useThemeContext } from '@/hooks/State';
import handleState from '@/state/actions';
import { ACTION, THEME, WINDOW } from '@/utils/tokens';
import { TThemeSwitcher } from '@/types/components/ThemeSwitcher';
import '@/css/index.css';

/**
 * @description Theme switcher component
 * @author Luca Cattide
 * @returns {*}  {React.ReactNode}
 */
const ThemeSwitcher = ({
  iconDark,
  iconLight,
}: TThemeSwitcher): React.ReactNode => {
  const { LABEL } = THEME;
  const { LIGHT, DARK } = THEME.NAME;
  const { getStorage, setStorage } = useStorage();
  const themeSaved = getStorage(LABEL) ?? '';
  const theme = useThemeContext();
  const dispatch = useDispatchContext();

  useEffect(() => {
    initTheme();
  }, []);

  /**
   * @description Theme selection getter
   * @author Luca Cattide
   * @param {boolean} isDark
   * @returns {*}  {string}
   */
  const getNewTheme = (isDark: boolean): string => (isDark ? DARK : LIGHT);

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

    // FIXME: New value not set
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
    <div className="theme-switcher flex items-center">
      <div className="theme-switcher__icon theme-switcher__icon--light mr-6 h-auto w-full max-w-[48px] min-w-[48px] pb-[4.8rem] select-none">
        {iconLight}
      </div>
      <Switch
        aria-label="Switch Theme"
        checked={!isLightTheme(theme)}
        className={`theme-switcher__field group data-[focus]:outline-accent relative flex h-19 w-38 cursor-pointer p-1 focus:outline-none data-[focus]:outline-1 ${isLightTheme(theme) ? 'bg-primary data-[checked]:bg-accent p-1' : 'bg-accent data-[checked]:bg-primary border-accent border-2 pt-[0.5px] pr-0 pb-0 pl-[2px]'}`}
        onChange={handleTheme}
        tabIndex={0}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-17 translate-x-0 group-data-[checked]:translate-x-19 ${isLightTheme(theme) ? 'bg-accent group-data-[checked]:bg-primary' : 'bg-primary group-data-[checked]:bg-accent'}`}
        />
      </Switch>
      <div className="theme-switcher__icon theme-switcher__icon--dark relative ml-6 h-auto w-full max-w-[48px] min-w-[48px] pb-[4.8rem] select-none">
        {iconDark}
      </div>
    </div>
    // Theme Switcher End
  );
};

export default ThemeSwitcher;
