<script lang="ts">
	import { getTableData } from '$lib';
	import TagCell from './Cells/TagCell.svelte';
	import TextCell from './Cells/TextCell.svelte';
	import DateTimeCell from './Cells/DateTimeCell.svelte';
	import TableBody from './TableBody.svelte';
	import DurationCell from './Cells/DurationCell.svelte';

	const columns = [
		{
			header: 'Rundown',
			key: 'title',
			cell: TagCell,
		},
		{
			header: '',
			key: 'subTitle',
			cell: TextCell,
		},
		{
			header: 'Est. duration',
			key: 'estimated_duration',
			cell: DurationCell,
		},
		{
			header: 'Front time',
			key: 'front_time',
			cell: DateTimeCell,
		},
		{
			header: 'End time',
			key: 'end_time',
			cell: DateTimeCell,
		},
		{
			header: 'Back time',
			key: 'back_time',
			cell: DateTimeCell,
		},
	];

	const data = getTableData();
</script>

<div class="flex flex-col">
	<div class="flex flex-row">
		<div class="w-[80px]"></div>
		{#each columns as column}
			<div class="w-40 border-b-2 bg-slate-300 p-2 text-slate-700">{column.header}</div>
		{/each}
	</div>

	<div class="flex flex-col">
		<TableBody {data} {columns} />
	</div>
</div>
