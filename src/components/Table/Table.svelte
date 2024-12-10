<script lang="ts">
	import { getTableData } from '$lib';
	import type { Episode } from '$lib/types';
	import TagCell from './Cells/TagCell.svelte';
	import TimeCell from './Cells/TimeCell.svelte';
	import TableBody from './TableBody.svelte';

	const props: { tableData: Episode } = $props();
	const columns = [
		{
			header: 'Rundown',
			key: 'title',
			cell: TimeCell,
		},
		{
			header: 'Est. duration',
			key: 'estimated_duration',
			cell: TagCell,
		},
		{
			header: 'Front time',
			key: 'front_time',
			cell: TagCell,
		},
		{
			header: 'End time',
			key: 'end_time',
			cell: TagCell,
		},
		{
			header: 'Back time',
			key: 'back_time',
			cell: TagCell,
		},
	];

	const data = getTableData();
	console.log(data);
</script>

<div class="flex flex-col">
	<div class="flex flex-row">
		<div class="w-[62px]"></div>
		{#each columns as column}
			<div class="w-40 bg-slate-300 p-2 text-slate-700">{column.header}</div>
		{/each}
	</div>

	<div class="flex flex-col">
		<TableBody {data} {columns} />
	</div>
</div>
