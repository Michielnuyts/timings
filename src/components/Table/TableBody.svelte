<script lang="ts">
	import ChevronDown from '../Icons/ChevronDown.svelte';
	import ChevronRight from '../Icons/ChevronRight.svelte';
	import TableCell from './TableCell.svelte';
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

<!-- open/closed chevron icon -->
{#snippet icon(rowId: string)}
	{@const Icon = rowOpenState[rowId] ? ChevronDown : ChevronRight}
	<Icon onclick={() => toggleRowCollapsedState(rowId)} />
{/snippet}

{#each props.data as row, index}
	<TableRow
		{row}
		columns={props.columns}
		rowNumber={index + 1}
		{rowOpenState}
		{toggleRowCollapsedState}
	/>

	{#if row.children.length > 0 && rowOpenState[row.id]}
		{#each row.children as row, childIndex}
			<TableRow
				{row}
				columns={props.columns}
				rowNumber={index + childIndex + 1}
				{rowOpenState}
				{toggleRowCollapsedState}
			/>
		{/each}
	{/if}
{/each}
