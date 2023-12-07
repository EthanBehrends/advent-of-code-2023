import { describe, test, expect } from "vitest";
import { partOne, partTwo } from "./index.js";
import fs from "fs/promises";

const day = "05";

describe(`Day ${day}`, async () => {
	const input = await fs.readFile(`src/day-${day}/input.txt`, "utf-8");

	const testInput = `\
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

	describe("Part one", () => {
		test("Test case", () => {
			expect(partOne(testInput)).toBe(35);
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

			expect(partTwo(testInput)).toBe(46);
		});

		test(`Result: ${partTwo(input)}`, async () => {
			expect(true).toBeTruthy();
		});
	});
});
