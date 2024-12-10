export type Timestamp = number;
export type DurationInMs = number;

export interface Part {
	/**
	 * Projected length of the section.
	 */
	estimated_duration: DurationInMs;
	/**
	 * Indicates the scheduled start time of a Part or Item.
	 */
	front_time: DurationInMs | null;
	/**
	 * Indicates the scheduled end time of a Part or Item.
	 */
	end_time: DurationInMs | null;
	/**
	 * Indicates the necessary start time to ensure the show ends on schedule.
	 */
	back_time: DurationInMs | null;
}

export interface Item extends Part {}

export interface Episode {
	episode: {
		id: string;
		status: string;
		title: string;
		parts: string[];
	};
	part: {
		[PartId: string]: {
			id: string;
			title: string;
			items: string[];
		};
	};
	item: {
		[ItemId: string]: {
			id: string;
			title: string;
		};
	};
}

export interface Timings {
	episode: {
		on_air_time: Timestamp;
		off_air_time: Timestamp;
	};
	part: {
		[PartId: string]: Part;
	};
	item: {
		[ItemId: string]: Item;
	};
}
