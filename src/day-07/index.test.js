import { describe, test, expect } from "vitest";
import { partOne, partTwo, categorizeHand } from "./index.js";
import fs from "fs/promises";

const day = "07";

describe(`Day ${day}`, async () => {
	const input = await fs.readFile(`src/day-${day}/input.txt`, "utf-8");

	const testInput = `\
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

	describe.skip("Part one", () => {
		test("Test case", () => {
			expect(partOne(testInput)).toBe(6440);
		});

		test(`Result: ${partOne(input)}`, async () => {
			expect(true).toBeTruthy();
		});
	});
	describe("Part two", () => {
		test("Test case", () => {
			// 			const testInput = `\
			// 467..114..
			// ...*......
			// ..35..633.
			// ......#...
			// 617*......
			// .....+.58.
			// ..592.....
			// ......755.
			// ...$.*....
			// .664.598..`;

			expect(partTwo(testInput)).toBe(5905);
		});

		test(`Result: ${partTwo(input)}`, async () => {
			expect(true).toBeTruthy();
		});
	});

	describe("categorizeHand", () => {
		test("Test case", () => {
			expect(categorizeHand("32T3K")).toMatchObject({ rank: 4 });
			expect(categorizeHand("AAJKK")).toMatchObject({ rank: 7 });
		});
	});
});
