import { describe, test, expect } from "vitest";
import { partOne, partTwo } from "./index.js";
import fs from "fs/promises";

const day = "04";

describe(`Day ${day}`, async () => {
	const input = await fs.readFile(`src/day-${day}/input.txt`, "utf-8");

	const testInput = `\
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

	const [, num, winners, own] = /Card (\d+): (.*) \| (.*)/.match(line);

	describe("Part one", () => {
		test("Test case", () => {
			expect(partOne(testInput)).toBe(13);
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

			expect(partTwo(testInput)).toBe(30);
		});

		test(`Result: ${partTwo(input)}`, async () => {
			expect(true).toBeTruthy();
		});
	});
});
