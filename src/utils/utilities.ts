import { ActionDispatch } from 'react';
import { ERROR, THEME } from './tokens';
import type { TStateAction } from '@/types/state/State';

/**
 * @description Context helper
 * Checks if the context is properly defined
 * @author Luca Cattide
 * @param {(string | ActionDispatch<[action]>)} context
 * @param {*} TStateAction
 */
const checkContext = (
  context: string | ActionDispatch<[action: TStateAction]> | null,
): void => {
  if (context === null) {
    throw new Error(ERROR.CONTEXT);
  }
};

/**
 * @description Light theme helper
 * Verifies if the current theme is the light one
 * @author Luca Cattide
 * @param {string} theme
 * @returns {*}  {boolean}
 */
const isLightTheme = (theme: string): boolean => theme === THEME.NAME.LIGHT;

export { checkContext, isLightTheme };
