export function partOne(input) {
	let sum = 0;

	input.split("\n").map((line) => {
		let value = 0;
		const afterColon = line.substring(line.indexOf(":") + 1);

		const [winningStr, haveStr] = afterColon.split("|");

		if (!winningStr || !haveStr) return;

		const winning = new Set(winningStr.trim().split(" ").filter(Boolean));

		haveStr
			.trim()
			.split(" ")
			.forEach((char) => {
				if (winning.has(char)) {
					if (!value) {
						value = 1;
					} else {
						value *= 2;
					}
				}
			});
		sum += value;
	});
	return sum;
}
export function partTwo(input) {
	let sum = 0;
	const collected = {};

	input.split("\n").map((line) => {
		const preColon = line.substring(0, line.indexOf(":")).split(" ").pop();

		if (!collected[preColon]) collected[preColon] = 0;

		collected[preColon]++;

		const afterColon = line.substring(line.indexOf(":") + 1);

		const [winningStr, haveStr] = afterColon.split("|");

		if (!winningStr || !haveStr) return;

		const winning = new Set(winningStr.trim().split(" ").filter(Boolean));

		let num = 0;
		haveStr
			.trim()
			.split(" ")
			.forEach((char) => {
				if (winning.has(char)) {
					num++;

					const index = String(Number(preColon) + Number(num));

					if (!collected[index]) collected[index] = 0;

					collected[index] += collected[preColon];
				}
			});

		sum += collected[preColon];
	});
	return sum;
}
export function partTwoRewritten(input) {
	let sum = 0;
	const collected = {};

	input.split("\n").map((line) => {
		const [, card, winningStr, haveStr] = line.match(/(\d+): (.*) \| (.*)/);

		const cardNum = Number(card);

		const winning = new Set(winningStr.split(" ").filter(Boolean));

		let num = 0;
		haveStr.split(" ").forEach((char) => {
			if (winning.has(char)) {
				num++;

				const index = String(Number(preColon) + Number(num));

				if (!collected[index]) collected[index] = 0;

				collected[index] += collected[preColon];
			}
		});

		sum += collected[preColon];
	});
	return sum;
}

const testInput = `\
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
partOne(testInput);
