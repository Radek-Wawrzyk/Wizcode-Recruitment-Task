import { ICON_NAMES } from '@/icons/constants/Icons';

type IconName = (typeof ICON_NAMES)[keyof typeof ICON_NAMES];

export type { IconName };
