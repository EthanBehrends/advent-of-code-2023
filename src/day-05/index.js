export function partOne(input) {
	let mode = "seeds";

	let seeds = [];
	const maps = {};
	input.split("\n").forEach((line) => {
		if (line.startsWith("seeds:")) {
			seeds.push(
				...line
					.match(/seeds: (.*)/)[1]
					.split(" ")
					.map(Number)
			);
		} else if (line.endsWith("map:")) {
			mode = line.match(/(.*) map:/)[1];
			maps[mode] = [];
		} else {
			const match = line.match(/([\d]+) ([\d]+) ([\d]+)/);

			if (match) {
				const [, x, y, z] = match;
				maps[mode].push({ x: Number(x), y: Number(y), z: Number(z) });
			}
		}
	});

	let lowest;

	seeds.forEach((seed) => {
		let mappedValue = seed;
		Object.entries(maps).forEach(([mode, map]) => {
			let value;

			map.forEach(({ x, y, z }) => {
				if (mappedValue > y && mappedValue < y + z) {
					value = x + (mappedValue - y);
				}
			});

			if (!value) value = mappedValue;

			mappedValue = value;
		});

		console.log(mappedValue);
		if (lowest === undefined || mappedValue < lowest) lowest = mappedValue;
	});

	return lowest;
}
export function partTwo(input) {
	let mode = "seeds";

	let seeds = [];
	const maps = {};
	const modeMaps = {};
	input.split("\n").forEach((line) => {
		if (line.startsWith("seeds:")) {
			seeds.push(
				...line
					.match(/seeds: (.*)/)[1]
					.split(" ")
					.map(Number)
			);

			mode = "seeds";
			maps["seeds"] = [];

			for (let i = 0; i < seeds.length; i += 2) {
				maps["seeds"].push({
					destination: seeds[i],
					length: seeds[i + 1],
				});
			}
		} else if (line.endsWith("map:")) {
			const newMode = line.match(/(.*) map:/)[1];
			modeMaps[mode] = newMode;
			mode = newMode;
			maps[mode] = [];
		} else {
			const match = line.match(/([\d]+) ([\d]+) ([\d]+)/);

			if (match) {
				const [, x, y, z] = match;
				maps[mode].push({
					destination: Number(x),
					source: Number(y),
					length: Number(z),
				});
			}
		}
	});

	const rangeMaps = new Map();

	const queue = maps["seeds"].map((mapping) => ["seeds", mapping]);

	console.log("modeMaps", modeMaps);

	const check = [];

	while (queue.length) {
		const [mode, map] = queue.shift();
		console.log("Getting possible ranges for", mode, map);

		const newMaps = [];
		rangeMaps.set(map, newMaps);

		const nextMode = modeMaps[mode];

		if (!nextMode) {
			check.push(map);
			continue;
		}

		const nextMaps = [...maps[nextMode]].sort((a, b) => a.source - b.source);

		let minimum = map.destination;
		let maximum = map.destination + map.length;

		nextMaps.forEach((nextMap) => {
			let source = nextMap.source;
			let destination = nextMap.destination;
			let length = nextMap.length;

			console.log({ source, destination, length, minimum, maximum });

			if (source >= maximum) return;

			if (source < minimum) {
				if (source + length < minimum) {
					return;
				} else {
					const diff = minimum - source;
					source = minimum;
					length -= diff;
					destination += diff;
				}
			}

			if (source + length > maximum) {
				length = maximum - source;
			}

			if (source > minimum) {
				newMaps.push({
					source: minimum,
					destination: minimum,
					length: source - minimum,
				});
			}

			newMaps.push({
				source,
				destination,
				length,
			});

			minimum = source + length;
		});

		if (minimum < maximum) {
			newMaps.push({
				source: minimum,
				destination: minimum,
				length: maximum - minimum,
			});
		}

		newMaps.forEach((map) => {
			queue.push([nextMode, map]);
		});
	}

	return check.map((c) => c.destination).sort((a, b) => a - b)[0];
}

function seedsHelper(arr) {
	const [[mode, map], ...rest] = arr;

	let minimum;

	map.sort((a, b) => a.destination - b.destination);

	for (let i = 0; i < map.length; i++) {}
}
