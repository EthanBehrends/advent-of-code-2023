export function partOne(input) {
	const hands = [];

	input.split("\n").forEach((line) => {
		const [cards, bid] = line.split(" ");
		hands.push({ hand: cards, bid: Number(bid) });
	});

	const sortedHands = hands.sort((a, b) => compareHands(a.hand, b.hand));

	console.log(
		JSON.stringify(
			sortedHands.map(({ hand, bid }, i) => [hand, bid * (i + 1)]),
			null,
			2
		)
	);

	return sortedHands.reduce((acc, { bid }, i) => acc + bid * (i + 1), 0);
}

const cardRanks = {
	fiveOfAKind: 9,
	fourOfAKind: 8,
	fullHouse: 7,
	threeOfAKind: 6,
	twoPairs: 5,
	onePair: 4,
	highCard: 3,
};

const cardValues = {
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	T: 10,
	J: 1,
	Q: 12,
	K: 13,
	A: 14,
};

export function categorizeHand(hand) {
	const map = new Map();

	hand.split("").forEach((card) => {
		if (!map.has(card)) map.set(card, 0);
		map.set(card, map.get(card) + 1);
	});

	const cards = [...map.entries()]
		.filter((c) => c[0] != "J")
		.sort((a, b) => b[1] - a[1]);

	const [cardType1, cardType2, ...restCardTypes] = cards;

	const jokers = map.get("J") || 0;

	if ((cardType1?.[1] ?? 0) + jokers === 5) {
		return {
			rank: cardRanks.fiveOfAKind,
			cards: [cardType1?.[0] ?? "J"],
		};
	}

	if (cardType1[1] + jokers === 4) {
		return {
			rank: cardRanks.fourOfAKind,
			cards: [cardType1[0], cardType2[0]],
		};
	}

	if (cardType1[1] + jokers >= 3) {
		if (cardType2[1] + (jokers - (3 - cardType1[1])) >= 2) {
			return {
				rank: cardRanks.fullHouse,
				cards: [
					cardType1[0],
					cardType2[0],
					...restCardTypes.map((card) => card[0]),
				],
			};
		}
		return {
			rank: cardRanks.threeOfAKind,
			cards: [
				cardType1[0],
				cardType2[0],
				...restCardTypes.map((card) => card[0]),
			],
		};
	}

	if (cardType1[1] + jokers === 2) {
		if (cardType2[1] + (jokers - (2 - cardType1[1])) === 2) {
			return {
				rank: cardRanks.twoPairs,
				cards: [
					cardType1[0],
					cardType2[0],
					...restCardTypes.map((card) => card[0]),
				],
			};
		}
		return {
			rank: cardRanks.onePair,
			cards: [
				cardType1[0],
				cardType2[0],
				...restCardTypes.map((card) => card[0]),
			],
		};
	}

	if (cardType1[1] === 1) {
		return {
			rank: cardRanks.highCard,
			cards: [
				cardType1[0],
				cardType2[0],
				...restCardTypes.map((card) => card[0]),
			],
		};
	}
}

function compareHands(hand1, hand2) {
	const hand1Category = categorizeHand(hand1);
	console.log(hand1, hand1Category);
	const hand2Category = categorizeHand(hand2);

	if (hand1Category.rank > hand2Category.rank) return 1;
	if (hand1Category.rank < hand2Category.rank) return -1;

	const hand1Cards = hand1.split("").map((card) => cardValues[card]);
	const hand2Cards = hand2.split("").map((card) => cardValues[card]);

	for (let i = 0; i < hand1Cards.length; i++) {
		if (hand1Cards[i] > hand2Cards[i]) return 1;
		if (hand1Cards[i] < hand2Cards[i]) return -1;
	}

	return 0;
}

export function partTwo(input) {
	const hands = [];

	input.split("\n").forEach((line) => {
		const [cards, bid] = line.split(" ");
		hands.push({ hand: cards, bid: Number(bid) });
	});

	const sortedHands = hands.sort((a, b) => compareHands(a.hand, b.hand));

	console.log(
		JSON.stringify(
			sortedHands.map(({ hand, bid }, i) => [hand, bid * (i + 1)]),
			null,
			2
		)
	);

	return sortedHands.reduce((acc, { bid }, i) => acc + bid * (i + 1), 0);
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
