<script lang="ts">
	import ChevronDown from '../Icons/ChevronDown.svelte';
	import ChevronRight from '../Icons/ChevronRight.svelte';
	import TableCell from './TableCell.svelte';

	const props: {
		rowOpenState: any;
		row: any;
		columns: any[];
		toggleRowCollapsedState: any;
		rowNumber: number;
	} = $props();
</script>

<!-- open/closed chevron icon -->
{#snippet icon(rowId: string)}
	{@const Icon = props.rowOpenState[rowId] ? ChevronDown : ChevronRight}
	<Icon onclick={() => props.toggleRowCollapsedState(rowId)} />
{/snippet}

<div class="flex flex-row items-center">
	<div class="flex w-[30px] items-center text-slate-800">{props.rowNumber}</div>

	{@render icon(props.row.id)}

	{#each props.columns as column}
		<TableCell row={props.row} {column} />
	{/each}
</div>
