<script lang="ts">
	import { timestampToHoursAndMinutes } from '$lib/timings/utils';

	const props: { value: number } = $props();

	const formattedTimeValue = timestampToHoursAndMinutes(props.value);
</script>

<div>
	{formattedTimeValue}
</div>
