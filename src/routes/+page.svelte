<script lang="ts">
	import timingsData from '../data/timings.json';
	import Table from '../components/Table/Table.svelte';
	import { formatTimestamp } from '$lib/timings/utils';

	const startTime = formatTimestamp(timingsData.episode.on_air_time);
	const endTime = formatTimestamp(timingsData.episode.off_air_time);
</script>

<div class="flex flex-col gap-8 p-4">
	<div class="flex gap-4 px-8">
		<p>Start: {startTime}</p>
		<p>End: {endTime}</p>
	</div>
	<Table />
</div>
