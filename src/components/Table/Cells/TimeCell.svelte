<script lang="ts">
	const props: { value: number } = $props();

	const msToTime = (duration: number) => {
		const milliseconds = Math.floor((duration % 1000) / 100);
		const seconds = Math.floor((duration / 1000) % 60);
		const minutes = Math.floor((duration / (1000 * 60)) % 60);
		const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		const formattedHours = hours < 10 ? '0' + hours : hours;
		const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
		const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

		return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds + '.' + milliseconds;
	};

	const formattedTimeValue = msToTime(props.value);
</script>

<div>
	{formattedTimeValue}
</div>
