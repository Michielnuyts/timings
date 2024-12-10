<script lang="ts">
	import ChevronDown from '../Icons/ChevronDown.svelte';
	import ChevronRight from '../Icons/ChevronRight.svelte';
	import TableCell from './TableCell.svelte';

	const props: {
		depth: number;
		rowOpenState: any;
		row: any;
		columns: any[];
		toggleRowCollapsedState: any;
		rowNumber?: number;
	} = $props();
</script>

<!-- open/closed chevron icon -->
{#snippet icon(rowId: string)}
	{@const Icon = props.rowOpenState[rowId] ? ChevronDown : ChevronRight}
	<div class="flex w-20 items-center justify-center">
		<Icon onclick={() => props.toggleRowCollapsedState(rowId)} />
	</div>
{/snippet}

<div class="flex flex-row items-center">
	{@render icon(props.row.id)}

	{#each props.columns as column}
		<TableCell row={props.row} {column} isChild={props.depth > 1} />
	{/each}
</div>
