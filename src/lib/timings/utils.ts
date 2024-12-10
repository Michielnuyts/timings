import { format } from 'date-fns';
import type { DurationInMs } from './types';

export const formatTimestamp = (timeInMs: DurationInMs) => {
	const date = new Date(timeInMs);

	return format(date, 'HH:mm:ss');
};
