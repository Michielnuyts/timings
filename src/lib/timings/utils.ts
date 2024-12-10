import { format } from 'date-fns';

export const timestampToHoursAndMinutes = (timeinSeconds: number) => {
	const date = new Date(timeinSeconds);

	return format(date, 'd MMM HH:mm');
};
