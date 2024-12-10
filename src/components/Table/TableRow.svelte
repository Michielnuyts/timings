<script lang="ts">
	import type { Row } from '$lib/timings';
	import ChevronDown from '../Icons/ChevronDown.svelte';
	import ChevronRight from '../Icons/ChevronRight.svelte';
	import TableCell from './TableCell.svelte';
	import type { Column } from './types';

	const props: {
		depth: number;
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
		<Icon onclick={() => props.toggleRowCollapsedState(rowId)} />
	</div>
{/snippet}

{#snippet placeholder()}
	<div class="w-[80px]"></div>
{/snippet}

<div class="flex flex-row items-center">
	{#if props.depth === 1}
		{@render icon(props.row.id)}
	{:else}
		{@render placeholder()}
	{/if}

	{#each props.columns as column}
		<TableCell row={props.row} {column} isChild={props.depth > 1} />
	{/each}
</div>
