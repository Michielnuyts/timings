<script lang="ts">
	import type { Row } from '$lib/timings';
	import TableRow from './TableRow.svelte';
	import type { Column } from './types';

	const props: { columns: Column<Row>[]; data: Row[] } = $props();

	/**
	 * Collapsed state to keep track of which rows are open/closed
	 * Open by default
	 * Example:
	 * {
	 * 		"123": true,
	 * 		"456": false,
	 * }
	 */
	const initialRowsState = Object.fromEntries(props.data.map(({ id }) => [id, true]));
	const rowOpenState = $state(initialRowsState);

	const toggleRowCollapsedState = (rowId: string) => {
		rowOpenState[rowId] = !rowOpenState[rowId];
	};
</script>

{#each props.data as row}
	<TableRow
		depth={1}
		{row}
		columns={props.columns}
		{rowOpenState}
		{toggleRowCollapsedState}
		rowNumber={1}
	/>

	{#if row.children && row?.children?.length > 0 && rowOpenState[row.id]}
		{#each row.children as childRow}
			<TableRow
				depth={2}
				row={childRow}
				columns={props.columns}
				rowNumber={1}
				{rowOpenState}
				{toggleRowCollapsedState}
			/>
		{/each}
	{/if}
{/each}
