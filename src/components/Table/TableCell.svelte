<script lang="ts">
	const props: { row: any; column: any; isChild: boolean } = $props();
	const CellComponent = props.column.cell;
</script>

<div
	class={`flex w-[180px] flex-row border-b border-slate-950 ${props.isChild ? 'bg-slate-300' : 'bg-slate-400'} p-2`}
>
	<CellComponent value={props.row[props.column.key]} />
</div>
