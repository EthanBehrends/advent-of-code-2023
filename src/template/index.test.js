import { describe, test, expect } from "vitest";
import { partOne, partTwo } from "./index.js";
import fs from "fs/promises";

const day = "04";

describe(`Day ${day}`, async () => {
	const input = await fs.readFile(`src/day-${day}/input.txt`, "utf-8");

	const testInput = `\
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
	describe("Part one", () => {
		test("Test case", () => {
			expect(partOne(testInput)).toBe(4361);
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

			expect(partTwo(testInput)).toBe(467835);
		});

		test(`Result: ${partTwo(input)}`, async () => {
			expect(true).toBeTruthy();
		});
	});
});
