import { format } from 'date-fns';

export const timestampToHoursAndMinutes = (timeinSeconds: number) => {
	const date = new Date(timeinSeconds * 1000);

	return format(date, 'HH:mm');
};
