import { useContext, ActionDispatch } from 'react';
import { DispatchContext, ThemeContext } from '@/state/contexts';
import { checkContext } from '@/utils/utilities';
import { TStateAction } from '@/types/state/State';

/**
 * @description Dispatch Context hook
 * @author Luca Cattide
 * @returns {*}  {ActionDispatch<[action}
 */
const useDispatchContext = (): ActionDispatch<[action: TStateAction]> => {
  // Hooks
  const context = useContext(DispatchContext);

  checkContext(context);

  return context as ActionDispatch<[action: TStateAction]>;
};

/**
 * @description Theme state context hook
 * @author Luca Cattide
 * @returns {*}  {string}
 */
const useThemeContext = (): string => {
  // Hooks
  const context = useContext(ThemeContext);

  checkContext(context);

  return context;
};

export { useDispatchContext, useThemeContext };
