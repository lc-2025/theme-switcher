import { ActionDispatch } from 'react';
import { TStateAction } from '@/types/state/State';

/**
 * @description State action handler
 * Dispatches a state reducer action
 * @author Luca Cattide
 * @param {*} action
 * @param {*} dispatch
 */
const handleState = (
  action: TStateAction,
  dispatch: ActionDispatch<[action: TStateAction]>,
) => {
  dispatch(action);
};

export default handleState;
