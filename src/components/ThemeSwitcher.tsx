import { useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useStorage } from '@lc-2025/storage-manager';
import { useDispatchContext, useThemeContext } from '@/hooks/State';
import handleState from '@/state/actions';
import { isLightTheme } from '@/utils/utilities';
import { ACTION, THEME, WINDOW } from '@/utils/tokens';
import { TThemeSwitcher } from '@/types/components/ThemeSwitcher';

/**
 * @description Theme switcher component
 * @author Luca Cattide
 * @returns {*}  {React.ReactNode}
 */
const ThemeSwitcher = ({
  iconDark,
  iconLight,
}: TThemeSwitcher): React.ReactNode => {
  let isDark = false;
  const { LABEL } = THEME;
  const { LIGHT, DARK } = THEME.NAME;
  const { getStorage, setStorage } = useStorage();
  const themeSaved = getStorage(LABEL) ?? '';
  const theme = useThemeContext();
  const dispatch = useDispatchContext();
  const LightIcon = iconLight;
  const DarkIcon = iconDark;

  useEffect(() => {
    // User preference + system-aware detection
    isDark =
      themeSaved === DARK || window.matchMedia(WINDOW.MEDIA.THEME.DARK).matches;

    handleState(
      { type: ACTION.THEME, element: isDark ? DARK : LIGHT },
      dispatch,
    );
    enableTheme(isDark);
  }, []);

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

    // Storage + state check
    if (themeSaved !== '') {
      setStorage(LABEL, value ? LIGHT : DARK);
    }

    handleState(
      { type: ACTION.THEME, element: value ? DARK : LIGHT },
      dispatch,
    );
  };

  return (
    // Theme Switcher Start
    <div className="theme-switcher flex items-center">
      <div className="theme-switcher__icon theme-switcher__icon--light mr-6 h-auto w-full max-w-[48px] min-w-[48px] pb-[4.8rem] select-none">
        <LightIcon />
      </div>
      <Switch
        checked={!isLightTheme(theme)}
        onChange={handleTheme}
        className={`theme-switcher__field group data-[focus]:outline-accent relative flex h-19 w-38 cursor-pointer p-1 focus:outline-none data-[focus]:outline-1 ${isLightTheme(theme) ? 'bg-primary data-[checked]:bg-accent p-1' : 'bg-accent data-[checked]:bg-primary border-accent border-2 pt-[0.5px] pr-0 pb-0 pl-[2px]'}`}
        tabIndex={0}
        aria-label="Switch Theme"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-17 translate-x-0 group-data-[checked]:translate-x-19 ${isLightTheme(theme) ? 'bg-accent group-data-[checked]:bg-primary' : 'bg-primary group-data-[checked]:bg-accent'}`}
        />
      </Switch>
      <div className="theme-switcher__icon theme-switcher__icon--dark relative ml-6 h-auto w-full max-w-[48px] min-w-[48px] pb-[4.8rem] select-none">
        <DarkIcon />
      </div>
    </div>
    // Theme Switcher End
  );
};

export default ThemeSwitcher;
