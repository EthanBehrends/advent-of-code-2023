export function partOne(input) {
	const [time, distance] = input.split("\n");
	const times = time
		.match(/Time:(.*)/)[1]
		.trim()
		.split(" ")
		.filter(Boolean)
		.map(Number);
	const distances = distance
		.match(/Distance:(.*)/)[1]
		.trim()
		.split(" ")
		.filter(Boolean)
		.map(Number);

	const races = times.map((time, i) => ({ time, distance: distances[i] }));

	return races.reduce((acc, race) => calculatePossibilities(race) * acc, 1);
}
export function partTwo(input) {
	const [time, distance] = input.split("\n");
	const times = Number(
		time
			.match(/Time:(.*)/)[1]
			.trim()
			.replace(/[\D]/g, "")
	);

	const distances = Number(
		distance
			.match(/Distance:(.*)/)[1]
			.trim()
			.replace(/[\D]/g, "")
	);

	return calculatePossibilities({ time: times, distance: distances });
	const races = times.map((time, i) => ({ time, distance: distances[i] }));

	return races.reduce((acc, race) => calculatePossibilities(race) * acc, 1);
}

function calculatePossibilities({ time, distance }) {
	let possibilities = 0;

	for (let i = 0; i <= time; i++) {
		const remaining = time - i;

		const speed = i;

		if (speed * remaining > distance) possibilities++;
	}

	return possibilities;
}
