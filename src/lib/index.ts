import type { Episode, TimeInMS, Timings } from './types';

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
				previousItem?.estimated_duration ?? currentItem?.estimated_duration
			);
			const endTime = getEndTime(frontTime, currentItem?.estimated_duration);
			const backTime = getBackTime(previousItem?.back_time, previousItem?.estimated_duration);

			timingsData[key][itemId] = {
				...currentItem,
				front_time: frontTime,
				end_time: endTime,
				back_time: backTime
			};

			previousItemId = itemId;
		});
	};

const setItemTimingsData = setTimingsDataWith('item');
const setPartTimingsData = setTimingsDataWith('part');

const getFrontTime = (previousFrontTime: TimeInMS, previousEstimatedDuration: TimeInMS) =>
	previousFrontTime + previousEstimatedDuration;

const getEndTime = (frontTime: TimeInMS, estimatedDuration: TimeInMS) =>
	frontTime + estimatedDuration;

const getBackTime = (previousBackTime?: TimeInMS | null, previousEstimatedDuration?: TimeInMS) => {
	if (!previousBackTime || !previousEstimatedDuration) {
		return 0;
	}

	return previousBackTime - previousEstimatedDuration;
};
