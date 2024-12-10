<script lang="ts">
	import TableRow from './TableRow.svelte';

	const props: { columns: any[]; data: any[] } = $props();

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

{#each props.data as row, index}
	<TableRow
		depth={1}
		{row}
		columns={props.columns}
		{rowOpenState}
		{toggleRowCollapsedState}
		rowNumber={1}
	/>

	{#if row.children.length > 0 && rowOpenState[row.id]}
		{#each row.children as row, childIndex}
			<TableRow
				depth={2}
				{row}
				columns={props.columns}
				rowNumber={1}
				{rowOpenState}
				{toggleRowCollapsedState}
			/>
		{/each}
	{/if}
{/each}
