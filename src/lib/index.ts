import type { Episode, TimeInMs, Timings } from './types';
import episodeData from '../data/episode.json';
import timingsData from '../data/timings.json';

export const calculateTimings = (episodeData: Episode, timingsData: Timings) => {
	const clonedTimingsData = structuredClone(timingsData);

	setItemTimingsData(episodeData, clonedTimingsData);
	setPartTimingsData(episodeData, clonedTimingsData);

	return clonedTimingsData;
};

const setTimingsDataWith =
	(key: 'item' | 'part') => (episodeData: Episode, timingsData: Timings) => {
		let previousItemId: string | undefined = undefined;

		Object.keys(episodeData.item).forEach((itemId) => {
			const previousItem = previousItemId ? timingsData?.[key]?.[previousItemId] : undefined;
			const currentItem = timingsData[key][itemId];

			const frontTime = getFrontTime(
				previousItem?.front_time ?? currentItem?.estimated_duration,
				previousItem?.estimated_duration ?? currentItem?.estimated_duration,
			);
			const endTime = getEndTime(frontTime, currentItem?.estimated_duration);
			const backTime = getBackTime(previousItem?.back_time, previousItem?.estimated_duration);

			timingsData[key][itemId] = {
				...currentItem,
				front_time: frontTime,
				end_time: endTime,
				back_time: backTime,
			};

			previousItemId = itemId;
		});
	};

const setItemTimingsData = setTimingsDataWith('item');
const setPartTimingsData = setTimingsDataWith('part');

const getFrontTime = (previousFrontTime: TimeInMs, previousEstimatedDuration: TimeInMs) =>
	previousFrontTime + previousEstimatedDuration;

const getEndTime = (frontTime: TimeInMs, estimatedDuration: TimeInMs) =>
	frontTime + estimatedDuration;

const getBackTime = (previousBackTime?: TimeInMs | null, previousEstimatedDuration?: TimeInMs) => {
	if (!previousBackTime || !previousEstimatedDuration) {
		return 0;
	}

	return previousBackTime - previousEstimatedDuration;
};

export const getTableData = () => {
	const timings = calculateTimings(episodeData, timingsData);

	return Object.entries(episodeData.part).map(([partId, partData]) => {
		const partTimings = timings.part[partId];

		return {
			...partData,
			...partTimings,
			children: partData.items.map((itemId) => {
				// @ts-expect-error fix key
				const itemData = episodeData.item[itemId];
				const itemTimings = timings.item[itemId];

				return {
					...itemData,
					...itemTimings,
				};
			}),
		};
	});
};
