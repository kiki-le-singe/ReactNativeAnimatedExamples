import { getStatusBarHeight } from 'react-native-status-bar-height';

import { vh } from './utils/units';

export const STATUS_BAR_HEIGHT = getStatusBarHeight();
export const HEADER_HEIGHT = 60 + STATUS_BAR_HEIGHT;
export const INPUT_CONTAINER_HEIGHT = 40;
export const HEADER_BACKGROUND_HEIGHT = vh(50);
export const SCROLL_SPAN = HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT;
