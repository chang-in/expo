import { createModifier } from '@expo/ui/jetpack-compose/modifiers';

export const customBorder = (params: { color?: string; width?: number; cornerRadius?: number }) =>
  createModifier('customBorder', params);
