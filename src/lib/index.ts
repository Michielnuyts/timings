import type { Episode, TimeInMs, Timings } from './types';
import episodeData from '../data/episode.json';
import timingsData from '../data/timings.json';

export const calculateTimings = (episodeData: Episode, timingsData: Timings) => {
	console.log(timingsData);
	const clonedTimingsData = structuredClone(timingsData);

	setPartTimingsData(episodeData, clonedTimingsData);
	setItemTimingsData(episodeData, clonedTimingsData);
	// setTimingsData(episodeData, clonedTimingsData);

	console.log(clonedTimingsData);
	return clonedTimingsData;
};

// const setTimingsData = (episodeData: Episode, timingsData: Timings) => {
// 	const startAirTime = timingsData.episode.on_air_time;
// 	const endAirTime = timingsData.episode.off_air_time;

// 	let previousPartId: string | undefined = undefined;
// 	let previousItemId: string | undefined = undefined;

// 	const previousPart = previousPartId ? timingsData.part[previousPartId] : undefined;
// 	const previousItem = previousItemId ? timingsData.item[previousItemId] : undefined;

// 	episodeData.episode.parts.forEach((partId) => {
// 		const currentPart = timingsData.part[partId];
// 		const frontTime = getFrontTime(
// 			previousPart?.front_time ?? startAirTime,
// 			previousPart?.estimated_duration ?? currentPart.estimated_duration,
// 		);
// 		const endTime = getEndTime(frontTime, currentPart.estimated_duration);
// 		const backTime = getBackTime(
// 			previousPart?.back_time ?? endAirTime,
// 			previousPart?.estimated_duration ?? currentPart.estimated_duration,
// 		);

// 		timingsData.part[partId] = {
// 			...currentPart,
// 			front_time: frontTime,
// 			end_time: endTime,
// 			back_time: backTime,
// 		};

// 		previousPartId = partId;

// 		episodeData.part[partId].items.forEach((itemId) => {
// 			const currentItem = timingsData.item[itemId];
// 			const frontTime = getFrontTime(
// 				previousItem?.front_time ?? startAirTime,
// 				previousItem?.estimated_duration ?? currentItem.estimated_duration,
// 			);
// 			const endTime = getEndTime(frontTime, currentItem.estimated_duration);
// 			const backTime = getBackTime(
// 				previousItem?.back_time ?? endAirTime,
// 				previousItem?.estimated_duration ?? currentItem.estimated_duration,
// 			);

// 			timingsData.part[partId] = {
// 				...currentItem,
// 				front_time: frontTime,
// 				end_time: endTime,
// 				back_time: backTime,
// 			};

// 			previousPartId = partId;
// 		});
// 	});
// };

const setTimingsDataWith =
	(key: 'item' | 'part') => (episodeData: Episode, timingsData: Timings) => {
		const startAirTime = timingsData.episode.on_air_time;
		const endAirTime = timingsData.episode.off_air_time;

		let previousId: string | undefined = undefined;

		Object.keys(episodeData[key]).forEach((id) => {
			const previous = previousId ? timingsData?.[key]?.[previousId] : undefined;
			const current = timingsData[key][id];

			const frontTime = getFrontTime(
				previous?.front_time ?? startAirTime,
				previous?.estimated_duration ?? current?.estimated_duration,
			);
			const endTime = getEndTime(frontTime, current?.estimated_duration);
			const backTime = getBackTime(
				previous?.back_time ?? endAirTime,
				previous?.estimated_duration ?? current.estimated_duration,
			);

			timingsData[key][id] = {
				...current,
				front_time: frontTime,
				end_time: endTime,
				back_time: backTime,
			};

			previousId = id;
		});
	};

const setItemTimingsData = setTimingsDataWith('item');
const setPartTimingsData = setTimingsDataWith('part');

const getFrontTime = (previousFrontTime: TimeInMs, previousEstimatedDuration: TimeInMs) => {
	console.log(previousFrontTime, previousEstimatedDuration);
	return previousFrontTime + previousEstimatedDuration;
};

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

	return Object.entries(episodeData.part).map(([partId, partData], index) => {
		const partTimings = timings.part[partId];

		return {
			...partData,
			title: 'Part',
			subTitle: `Part ${index + 1}`,
			...partTimings,
			children: partData.items.map((itemId) => {
				// @ts-expect-error fix key
				const itemData = episodeData.item[itemId];
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
