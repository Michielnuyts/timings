<script lang="ts">
	import type { Episode } from '$lib/types';

	const props: { tableData: Episode } = $props();
	const columns = [
		{
			header: 'Rundown'
		},
		{
			header: 'Est. duration'
		},
		{
			header: 'Front time'
		},
		{
			header: 'End time'
		},
		{
			header: 'Back time'
		}
	];
</script>

<div class="grid grid-cols-7">
	{#each columns as column}
		<div class="bg-slate-700 p-2 text-white">{column.header}</div>
	{/each}
	{#each [1, 2, 3] as row}
		<div>{row}</div>
	{/each}
</div>
