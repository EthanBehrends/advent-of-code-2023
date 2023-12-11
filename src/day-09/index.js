export function partOne(input) {
	return input.split("\n").reduce((acc, line) => {
		let latest = line.split(" ").map(Number);
		let history = [latest];

		while (latest.some((num) => num !== 0)) {
			const newEntry = [];

			for (let i = 0; i < latest.length - 1; i++) {
				const [a, b] = latest.slice(i, i + 2);

				newEntry.push(b - a);
			}

			history.unshift(newEntry);
			latest = newEntry;
		}

		return acc + history.reduce((acc, entry) => acc + entry.at(-1), 0);
	}, 0);
}

export function partTwo(input) {
	let sum = 0;

	input.split("\n").forEach((line, i, arr) => {
		let latest = line.split(" ").map(Number);
		let history = [latest];

		while (latest.some((num) => num !== 0)) {
			const newEntry = [];

			for (let i = 0; i < latest.length - 1; i++) {
				const [a, b] = latest.slice(i, i + 2);

				newEntry.push(b - a);
			}

			history.unshift(newEntry);
			latest = newEntry;
		}

		const debug = i < 10 && arr.length > 90;

		if (debug) console.log(history.map((entry) => entry.join(" ")));

		sum += history.reduce((acc, entry) => {
			const last = entry[0];

			if (debug) console.log(entry.join(" "), last - acc);

			return last - acc;
		}, 0);
	});

	return sum;
}
