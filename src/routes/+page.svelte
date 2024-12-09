<script lang="ts">
	import { calculateTimings } from '$lib';
	import timingsData from '../data/timings.json';
	import episodeData from '../data/episode.json';
	import Table from '../components/Table/Table.svelte';

	const result = calculateTimings(episodeData, timingsData);
</script>

<Table tableData={episodeData} />
