<script lang="ts">
	import type { Row } from '$lib/timings/types';
	import IconButton from '../IconButton/IconButton.svelte';
	import ChevronDown from '../Icons/ChevronDown.svelte';
	import ChevronRight from '../Icons/ChevronRight.svelte';
	import TableCell from './TableCell.svelte';
	import type { Column } from './types';

	const props: {
		isChildRow: boolean;
		rowOpenState: Record<string, boolean>;
		row: Row;
		columns: Column<Row>[];
		toggleRowCollapsedState: (rowId: string) => void;
	} = $props();
</script>

<!-- open/closed chevron icon -->
{#snippet icon(rowId: string)}
	{@const Icon = props.rowOpenState[rowId] ? ChevronDown : ChevronRight}
	<div class="flex w-20 items-center justify-center">
		<IconButton children={Icon} onclick={() => props.toggleRowCollapsedState(rowId)} />
	</div>
{/snippet}

<!-- empty placeholder for deepest level rows -->
{#snippet placeholder()}
	<div class="w-[80px]"></div>
{/snippet}

<div class="flex flex-row items-center">
	{#if props.isChildRow}
		{@render placeholder()}
	{:else}
		{@render icon(props.row.id)}
	{/if}

	{#each props.columns as column}
		<TableCell row={props.row} {column} isChild={props.isChildRow} />
	{/each}
</div>
