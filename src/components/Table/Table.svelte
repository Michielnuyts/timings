<script lang="ts">
	import type { Episode } from '$lib/types';
	import TableRow from './TableRow.svelte';

	const props: { tableData: Episode } = $props();
	const columns = [
		{
			header: 'Rundown',
			key: 'rundown'
		},
		{
			header: 'Est. duration',
			key: 'duration'
		},
		{
			header: 'Front time',
			key: 'frontTime'
		},
		{
			header: 'End time',
			key: 'endTime'
		},
		{
			header: 'Back time',
			key: 'backTime'
		}
	];

	const data = [
		{
			rundown: 1,
			duration: 2,
			frontTime: 3,
			endTime: 4,
			backTime: 5
		},
		{
			rundown: 7,
			duration: 5,
			frontTime: 11,
			endTime: 12,
			backTime: 21
		}
	];
</script>

<div class="flex flex-col">
	<div class="flex flex-row">
		{#each columns as column}
			<div class="w-40 bg-slate-700 p-2 text-white">{column.header}</div>
		{/each}
	</div>

	<div class="flex flex-row">
		{#each columns as column}
			<div class="flex flex-col">
				{#each data as row}
					<TableRow {row} {column} />
				{/each}
			</div>
		{/each}
	</div>
</div>
