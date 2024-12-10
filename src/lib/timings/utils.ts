import { format } from 'date-fns';
import type { TimeInMs } from './types';

export const formatTimestamp = (timeInMs: TimeInMs) => {
	const date = new Date(timeInMs);

	return format(date, 'HH:mm:ss');
};
