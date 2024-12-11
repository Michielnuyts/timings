import { calculateTimings } from '.';
import episodeData from '../../data/episode.json';
import timingsData from '../../data/timings.json';
import type { Row } from './types';

export const getTableData = (): Row[] => {
	const timings = calculateTimings(episodeData, timingsData);

	return Object.entries(episodeData.part).map(([partId, partData], index) => {
		const partTimings = timings.part[partId];

		return {
			...partData,
			title: 'Part',
			subTitle: `Part ${index + 1}`,
			...partTimings,
			children: partData.items.map((itemId) => {
				const itemData = episodeData.item[itemId as keyof typeof episodeData.item];
				const itemTimings = timings.item[itemId];

				return {
					...itemData,
					title: 'Item',
					subTitle: itemData.title,
					...itemTimings,
				};
			}),
		};
	});
};
