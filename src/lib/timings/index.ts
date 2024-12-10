import type { Episode, TimeInMs, Timings } from './types';
import episodeData from '../../data/episode.json';
import timingsData from '../../data/timings.json';

export const calculateTimings = (episodeData: Episode, timingsData: Timings) => {
	const clonedTimingsData = structuredClone(timingsData);

	// setPartTimingsData(episodeData, clonedTimingsData);
	// setItemTimingsData(episodeData, clonedTimingsData);
	setTimingsData(episodeData, clonedTimingsData);

	return clonedTimingsData;
};

const setTimingsData = (episodeData: Episode, timingsData: Timings) => {
	const startAirTime = timingsData.episode.on_air_time;
	const endAirTime = timingsData.episode.off_air_time;

	let previousPartId: string | undefined = undefined;
	let previousItemId: string | undefined = undefined;

	episodeData.episode.parts.forEach((partId, partIndex) => {
		const isFirstPart = partIndex === 0;
		const currentPart = timingsData.part[partId];
		const previousPart = previousPartId ? timingsData.part[previousPartId] : undefined;
		const frontTime = isFirstPart
			? startAirTime
			: getFrontTime(
					previousPart?.front_time ?? startAirTime,
					previousPart?.estimated_duration ?? currentPart.estimated_duration,
				);
		const endTime = getEndTime(frontTime, currentPart.estimated_duration);
		const backTime = getBackTime(
			previousPart?.back_time ?? endAirTime,
			previousPart?.estimated_duration ?? currentPart.estimated_duration,
		);
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
			console.log({ currentItem, previousItem });
			const frontTime = isFirstItem
				? partWithTimings.front_time
				: getFrontTime(
						previousItem?.front_time ?? startAirTime,
						previousItem?.estimated_duration ?? currentItem.estimated_duration,
					);
			const endTime = getEndTime(frontTime, currentItem.estimated_duration);
			const backTime = isLastItem
				? currentPart.end_time
				: getBackTime(
						previousItem?.back_time ?? endAirTime,
						previousItem?.estimated_duration ?? currentItem.estimated_duration,
					);

			timingsData.part[partId] = {
				...currentItem,
				front_time: frontTime,
				end_time: endTime,
				back_time: backTime,
			};

			previousItemId = itemId;
		});
	});
};

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
				previous?.back_time ?? endAirTime, // TODO this is wrong
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
