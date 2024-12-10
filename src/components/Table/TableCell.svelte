<script lang="ts">
	const props: { row: any; column: any } = $props();
	const CellComponent = props.column.cell;
</script>

<div class="flex w-40 flex-row border-b border-slate-950 bg-slate-400 p-2">
	<CellComponent value={props.row[props.column.key]} />
</div>
