import type { Episode, DurationInMs, Timings } from './types';
import episodeData from '../../data/episode.json';
import timingsData from '../../data/timings.json';

export const calculateTimings = (episodeData: Episode, timingsData: Timings) => {
	const clonedTimingsData = structuredClone(timingsData);

	setTimingsData(episodeData, clonedTimingsData);

	return clonedTimingsData;
};

const setTimingsData = (episodeData: Episode, timingsData: Timings) => {
	const startAirTime = timingsData.episode.on_air_time;
	const endAirTime = timingsData.episode.off_air_time;

	let previousPartId: string | undefined = undefined;
	let previousItemId: string | undefined = undefined;

	const parts = episodeData.episode.parts;

	parts.forEach((partId, partIndex) => {
		const isFirstPart = partIndex === 0;
		const isLastPart = partIndex === parts.length - 1;
		const currentPart = timingsData.part[partId];
		const previousPart = previousPartId ? timingsData.part[previousPartId] : undefined;

		const frontTime = isFirstPart
			? startAirTime
			: getFrontTime(
					previousPart?.front_time ?? startAirTime,
					previousPart?.estimated_duration ?? currentPart.estimated_duration,
				);
		const endTime = getEndTime(frontTime, currentPart.estimated_duration);

		const backTime = isLastPart
			? endAirTime - currentPart.estimated_duration
			: getBackTime(previousPart?.back_time ?? startAirTime, previousPart?.estimated_duration ?? 0);

		const partWithTimings = {
			...currentPart,
			front_time: frontTime,
			end_time: endTime,
			back_time: backTime,
		};
		timingsData.part[partId] = partWithTimings;
		previousPartId = partId;

		const items = episodeData.part[partId].items;

		items.forEach((itemId, itemIndex) => {
			const isFirstItem = itemIndex === 0;
			const isLastItem = itemIndex === items.length - 1;
			const currentItem = timingsData.item[itemId];
			const previousItem = previousItemId ? timingsData.item[previousItemId] : undefined;

			const frontTime = isFirstItem
				? partWithTimings.front_time
				: getFrontTime(
						previousItem?.front_time ?? startAirTime,
						previousItem?.estimated_duration ?? currentItem.estimated_duration,
					);
			const endTime = getEndTime(frontTime, currentItem.estimated_duration);

			const backTime = isLastItem
				? partWithTimings.end_time
				: getBackTime(
						previousItem?.back_time ?? partWithTimings.back_time,
						previousItem?.estimated_duration ?? 0,
					);

			timingsData.item[itemId] = {
				...currentItem,
				front_time: frontTime,
				end_time: endTime,
				back_time: backTime,
			};

			previousItemId = itemId;
		});
	});
};

const getFrontTime = (previousFrontTime: DurationInMs, previousEstimatedDuration: DurationInMs) =>
	previousFrontTime + previousEstimatedDuration;

const getEndTime = (frontTime: DurationInMs, estimatedDuration: DurationInMs) =>
	frontTime + estimatedDuration;

const getBackTime = (previousBackTime: DurationInMs, previousEstimatedDuration: DurationInMs) =>
	previousBackTime + previousEstimatedDuration;

/**
 * Table specific data
 */
export type Row = {
	id: string;
	title: string;
	subTitle: string;
	estimated_duration: number;
	front_time: number | null;
	end_time: number | null;
	back_time: number | null;
	children?: Row[];
};

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
