import { ACTION, STATE } from '@/utils/tokens';
import { TStateAction } from '@/types/state/State';

/**
 * @description Theme state reducer
 * Manages the theme state updates
 * @author Luca Cattide
 * @param {string} state
 * @param {TStateAction} action
 * @returns {*}  {string}
 */
const reducerTheme = (state: string, action: TStateAction): string => {
  const { THEME, RESET } = ACTION;
  const { type, element } = action;
  let reducerTheme = null;

  switch (type) {
    case THEME:
      state = element;
      reducerTheme = state;
      break;

    case RESET:
      reducerTheme = STATE.theme;
      break;

    default:
      reducerTheme = STATE.theme;
  }

  return reducerTheme;
};

export { reducerTheme };
