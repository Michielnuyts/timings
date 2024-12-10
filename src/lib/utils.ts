import type { TimeInMs } from './types';

export const timestampToHoursAndMinutes = (timeinMs: TimeInMs) => {
	const date = new Date(timeinMs);

	return `${date.getHours()}:${String(date.getMinutes()).padEnd(2, '0')}`;
};
