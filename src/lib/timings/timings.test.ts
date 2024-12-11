import { expect, test } from 'vitest';
import { calculateTimings } from '.';
import episodeData from '../../data/episode.json';
import timingsData from '../../data/timings.json';

test('timings data gets calculated correctly', () => {
	const result = calculateTimings(episodeData, timingsData);

	expect(result).toMatchSnapshot();
});
