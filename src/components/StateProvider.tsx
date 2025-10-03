import { useCallback, useMemo, useReducer } from 'react';
import { DispatchContext, ThemeContext } from '@/state/contexts';
import { reducerTheme } from '@/state/reducers';
import { STATE } from '@/utils/tokens';

/**
 * @description Theme Context Provider component
 * Theme context provider wrapper
 * @author Luca Cattide
 * @param {{
 *   children: React.ReactNode;
 * }} {
 *   children,
 * }
 * @returns {*}  {React.ReactNode}
 */
const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [state, dispatch] = useReducer(reducerTheme, STATE.theme);
  const setTheme = useCallback(dispatch, []);
  const theme = useMemo(() => state, [state]);

  return (
    <ThemeContext value={theme}>
      <DispatchContext value={setTheme}>{children}</DispatchContext>
    </ThemeContext>
  );
};

export { ThemeProvider };
