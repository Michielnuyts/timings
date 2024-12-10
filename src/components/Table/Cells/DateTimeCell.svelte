<script lang="ts">
	import { formatTimestamp } from '$lib/timings/utils';

	const props: { value: number } = $props();

	const formattedTimeValue = formatTimestamp(props.value);
</script>

<div>
	{formattedTimeValue}
</div>
