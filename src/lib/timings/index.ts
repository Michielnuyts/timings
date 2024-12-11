import type { Episode, DurationInMs, Timings } from './types';

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

// - Front Time: Previous Front Time + Previous Estimated Duration` which is also equals to the previous End Time.
//     - The Front Time of the first Part in an Episode is the same as the (Episode) On Air Time.
//     - The Front Time of the first Item in a Part is the same as the Front Time of the Part it belongs to.
const getFrontTime = (previousFrontTime: DurationInMs, previousEstimatedDuration: DurationInMs) =>
	previousFrontTime + previousEstimatedDuration;

// - End Time: Front Time + Estimated Duration
//     - The End Time of the first Part in an Episode is the same as the (Episode) On Air Time + Part Estimated Duration
//     - The Front Time of the first Item in a Part is the same as the Front Time of the Part it belongs to.
const getEndTime = (frontTime: DurationInMs, estimatedDuration: DurationInMs) =>
	frontTime + estimatedDuration;

// - Back Time: Previous Back Time - Previous Estimated Duration
//     - The Back Time of the last Part in an Episode is the same as the (Episode) Off Air Time - Part Estimated Duration
//     - The Back Time of the last Item in a Part is the same as the End Time of the Part it belongs to.
const getBackTime = (previousBackTime: DurationInMs, previousEstimatedDuration: DurationInMs) =>
	previousBackTime + previousEstimatedDuration;
