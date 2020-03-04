import { getStatusBarHeight } from 'react-native-status-bar-height';

import { vh } from './utils/units';

export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const HEADER_HEIGHT = 60 + STATUS_BAR_HEIGHT;
export const HERO_HEIGHT = vh(40);
export const TOTAL_HEIGHT = HEADER_HEIGHT + HERO_HEIGHT;
export const INPUT_CONTAINER_HEIGHT = 40;
