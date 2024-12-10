<script lang="ts">
	import type { Row } from '$lib/timings';
	import TableRow from './TableRow.svelte';
	import type { Column } from './types';

	const { columns, data }: { columns: Column<Row>[]; data: Row[] } = $props();

	/**
	 * Collapsed state to keep track of which rows are open/closed
	 * Open by default
	 * Example:
	 * {
	 * 		"123": true,
	 * 		"456": false,
	 * }
	 */
	const initialRowsState = Object.fromEntries(data.map(({ id }) => [id, true]));
	const rowOpenState = $state(initialRowsState);

	const toggleRowCollapsedState = (rowId: string) => {
		rowOpenState[rowId] = !rowOpenState[rowId];
	};
</script>

{#each data as row}
	<TableRow depth={1} {row} {columns} {rowOpenState} {toggleRowCollapsedState} />

	{#if row.children && row?.children?.length > 0 && rowOpenState[row.id]}
		{#each row.children as childRow}
			<TableRow depth={2} row={childRow} {columns} {rowOpenState} {toggleRowCollapsedState} />
		{/each}
	{/if}
{/each}
