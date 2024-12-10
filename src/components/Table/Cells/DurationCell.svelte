<script lang="ts">
	const props: { value: number } = $props();

	const msToTime = (duration: number) => {
		const seconds = Math.floor((duration / 1000) % 60);
		const minutes = Math.floor((duration / (1000 * 60)) % 60);
		const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
		const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

		return formattedMinutes + ':' + formattedSeconds;
	};

	const formattedTimeValue = msToTime(props.value);
</script>

<div>
	{formattedTimeValue}
</div>
