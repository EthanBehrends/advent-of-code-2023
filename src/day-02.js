import { input } from "./day-02-input.js";

function parseGame(input) {
	const [, game, data] = input.match(/Game ([\d]+):(.*)/);

	const mins = data
		.split(/[;,]/)
		.map((line) => line.trim().split(" "))
		.reduce(
			(acc, [num, color]) => ({
				...acc,
				[color]:
					acc[color] && acc[color] > Number(num) ? acc[color] : Number(num),
			}),
			{}
		);
	return { game, mins };
}

const games = input.split("\n").map(parseGame);

const possible = { red: 12, blue: 14, green: 13 };

const possibleGames = games.filter(({ mins }) =>
	Object.entries(mins).every(([color, num]) => num <= possible[color])
);

console.log(
	games
		.map(({ mins }) => Object.values(mins).reduce((a, b) => a * b, 1))
		.reduce((a, b) => a + b, 0)
);

// console.log(possibleGames.reduce((acc, { game }) => acc + Number(game), 0));
