<script lang="ts">
	import type { Row } from '$lib/timings';
	import { cellWidth } from './config';
	import type { Column } from './types';

	const { row, column, isChild }: { row: Row; column: Column<Row>; isChild: boolean } = $props();
	const CellComponent = column.cell;
</script>

<div
	class={`flex w-[${cellWidth}px] flex-row border-b border-slate-950 p-2`}
	class:bg-slate-300={isChild}
	class:bg-slate-400={!isChild}
>
	<CellComponent value={row[column.key]} />
</div>
