import { vi } from "date-fns/locale";

export function partOne(input) {
	const grid = input.split("\n").map((line) => line.split(""));
	const distMap = new Map();

	let startingPosition;

	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];

		for (let x = 0; x < row.length; x++) {
			const char = row[x];

			if (char === "S") {
				startingPosition = { x, y };

				const N = grid[y - 1]?.[x];
				const S = grid[y + 1]?.[x];
				const E = grid[y]?.[x + 1];
				const W = grid[y]?.[x - 1];

				const connectsN = ["|", "7", "F"].includes(N);

				const connectsS = ["|", "J", "L"].includes(S);

				const connectsE = ["-", "J", "7"].includes(E);

				const connectsW = ["-", "F", "L"].includes(W);

				if (connectsN) {
					if (connectsE) grid[y][x] = "L";
					else if (connectsW) grid[y][x] = "J";
					else grid[y][x] = "|";
				} else if (connectsS) {
					if (connectsE) grid[y][x] = "F";
					else if (connectsW) grid[y][x] = "7";
					else grid[y][x] = "|";
				} else if (connectsE) {
					grid[y][x] = "-";
				}
			}
		}
	}

	let queue = [[startingPosition, 0]];

	while (queue.length) {
		const [position, dist] = queue.shift();

		navigate(grid, position, (x, y) => {
			if (distMap.has(`${x},${y}`) && distMap.get(`${x},${y}`) <= dist + 1)
				return;

			distMap.set(`${x},${y}`, dist + 1);

			queue.push([{ x, y }, dist + 1]);
		});
	}

	const max = Math.max(...distMap.values());

	return max;
}

function navigate(grid, position, cb) {
	const { x, y } = position;

	let char = grid[y]?.[x];
	if (!char) return;

	// console.log(x, y, char);

	switch (char) {
		case "|": {
			cb(x, y - 1, 0);
			cb(x, y + 1, 0);

			break;
		}
		case "-": {
			cb(x + 1, y, 0);
			cb(x - 1, y, 0);

			break;
		}
		case "J": {
			cb(x, y - 1, -90);
			cb(x - 1, y, 90);

			break;
		}
		case "L": {
			cb(x, y - 1, 90);
			cb(x + 1, y, -90);

			break;
		}
		case "7": {
			cb(x, y + 1, 90);
			cb(x - 1, y, -90);

			break;
		}
		case "F": {
			cb(x + 1, y, 90);
			cb(x, y + 1, -90);

			break;
		}
		default:
			break;
	}
}

export function partTwo(input) {
	const grid = input.split("\n").map((line) => line.split(""));

	let startingPosition;

	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];

		for (let x = 0; x < row.length; x++) {
			const char = row[x];

			if (char === "S") {
				startingPosition = { x, y };

				const N = grid[y - 1]?.[x];
				const S = grid[y + 1]?.[x];
				const E = grid[y]?.[x + 1];
				const W = grid[y]?.[x - 1];

				const connectsN = ["|", "7", "F"].includes(N);

				const connectsS = ["|", "J", "L"].includes(S);

				const connectsE = ["-", "J", "7"].includes(E);

				const connectsW = ["-", "F", "L"].includes(W);

				if (connectsN) {
					if (connectsE) grid[y][x] = "L";
					else if (connectsW) grid[y][x] = "J";
					else grid[y][x] = "|";
				} else if (connectsS) {
					if (connectsE) grid[y][x] = "F";
					else if (connectsW) grid[y][x] = "7";
				} else if (connectsE) {
					grid[y][x] = "-";
				}
			}
		}
	}

	const visited = new Set();
	let queue = [startingPosition];
	let startingAngle = 0;
	const startingChar = grid[startingPosition.y]?.[startingPosition.x];

	if (startingChar === "F") {
		startingAngle = -90;
	} else if (startingChar === "7") {
		startingAngle = 0;
	} else if (startingChar === "J") {
		startingAngle = 0;
	} else if (startingChar === "-") {
		startingAngle = 0;
	} else if (startingChar === "L") {
		startingAngle = -180;
	} else if (startingChar === "|") {
		startingAngle = -90;
	}

	let angle = startingAngle;

	let toRevisit = [];

	const debug = false && grid.length < 100;

	const arrow = ({ x, y }) =>
		y === -1 ? "↑" : x === 1 ? "→" : y === 1 ? "↓" : x === -1 ? "←" : " ";

	let lastVisited;
	while (queue.length) {
		const position = queue.shift();

		navigate(grid, position, (nextX, nextY, a) => {
			const { x, y } = position;

			if (
				(visited.has(`${nextX},${nextY}`) &&
					!(
						visited.size > 2 &&
						nextX === startingPosition.x &&
						nextY === startingPosition.y
					)) ||
				(position === startingPosition && visited.size == 1)
			)
				return;

			toRevisit.push({ x, y, a });

			angle += a;
			lastVisited = `${x},${y}`;
			visited.add(lastVisited);

			if (!visited.has(`${nextX},${nextY}`)) queue.push({ x: nextX, y: nextY });
		});
	}

	const clockwise = angle - startingAngle > 0;

	let currentAngle = startingAngle;

	const contained = new Set();

	while (toRevisit.length) {
		let { x, y, a } = toRevisit.shift();

		const testDir = () => {
			const vec = {
				x:
					Math.round(Math.sin(currentAngle * (Math.PI / 180))) *
					(clockwise ? -1 : 1),
				y:
					-Math.round(Math.cos(currentAngle * (Math.PI / 180))) *
					(clockwise ? -1 : 1),
			};

			let posx = x + vec.x;
			let posy = y + vec.y;

			while (!visited.has(`${posx},${posy}`) && grid[posy]?.[posx]) {
				contained.add(`${posx},${posy}`);
				posx += vec.x;
				posy += vec.y;
			}
		};

		testDir();

		currentAngle += a;

		if (a !== 0) testDir();
	}

	// console.log(
	// 	grid
	// 		.map((row, y) =>
	// 			row
	// 				.map((char, x) =>
	// 					visited.has(`${x},${y}`)
	// 						? char
	// 						: contained.has(`${x},${y}`)
	// 						? "\x1b[33mI\x1b[0m"
	// 						: "."
	// 				)
	// 				.join("")
	// 		)
	// 		.join("\n")
	// );

	return contained.size;
}
