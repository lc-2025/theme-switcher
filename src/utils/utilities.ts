import { ActionDispatch } from 'react';
import { ERROR } from './tokens';
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

export { checkContext };
