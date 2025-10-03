import { createContext, ActionDispatch } from 'react';
import { STATE } from '@/utils/tokens';
import { TStateAction } from '@/types/state/State';

// State & Disaptch Contexts
const DispatchContext = createContext<ActionDispatch<
  [action: TStateAction]
> | null>(null);
const ThemeContext = createContext<string>(STATE.theme);

export { DispatchContext, ThemeContext };
