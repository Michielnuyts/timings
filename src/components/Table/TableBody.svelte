<script lang="ts">
	import type { Row } from '$lib/timings/types';
	import type { Column } from './types';
	import TableRow from './TableRow.svelte';

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

<div class="flex flex-col">
	{#each data as row}
		<TableRow {row} {columns} {rowOpenState} {toggleRowCollapsedState} isChildRow={false} />

		{#if row.children && row?.children?.length > 0 && rowOpenState[row.id]}
			{#each row.children as childRow}
				<TableRow
					row={childRow}
					{columns}
					{rowOpenState}
					{toggleRowCollapsedState}
					isChildRow={true}
				/>
			{/each}
		{/if}
	{/each}
</div>
