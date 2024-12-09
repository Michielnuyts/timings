<script lang="ts">
	const props: { row: any; column: any } = $props();
</script>

<div class="flex w-40 flex-row border-b-2 border-r-2 border-slate-950 bg-slate-400 p-2">
	{props.row?.[props.column.key]}
</div>
