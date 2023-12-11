import { describe, test, expect } from "vitest";
import { partOne, partTwo, categorizeHand } from "./index.js";
import fs from "fs/promises";

const day = "09";

describe(`Day ${day}`, async () => {
	const input = await fs.readFile(`src/day-${day}/input.txt`, "utf-8");

	const testInput = `\
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

	describe("Part one", () => {
		test("Test case", () => {
			expect(partOne(testInput)).toBe(114);
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

			expect(partTwo(testInput)).toBe(2);
		});

		test(`Result: ${partTwo(input)}`, async () => {
			expect(true).toBeTruthy();
		});
	});
});
