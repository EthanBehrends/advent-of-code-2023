import { input } from "./day-03-input.js";

function solve() {
	const array = input.split("\n").map((line) => line.split(""));

	let sum = 0;

	let currentNumber = undefined;

	let currentNumberValid = false;

	for (let i = 0; i < array.length; i++) {
		const line = array[i];
		for (let j = 0; j < line.length; j++) {
			const char = line[j];

			if (/\d/.test(char)) {
				if (!currentNumberValid) {
					if (isAdjacentToSymbol(array, i, j)) {
						currentNumberValid = true;
					}
				}

				if (currentNumber === undefined) currentNumber = 0;
				currentNumber *= 10;
				currentNumber += Number(char);
			} else {
				if (currentNumberValid) {
					// console.log(currentNumber);
					sum += currentNumber;
				}
				currentNumber = undefined;
				currentNumberValid = false;
			}
		}
	}

	return sum;
}

function isAdjacentToSymbol(array, i, j) {
	for (let k = i - 1; k <= i + 1; k++) {
		for (let l = j - 1; l <= j + 1; l++) {
			if (array[k]?.[l] && !/[\d\.]/.test(array[k][l])) {
				return true;
			}
		}
	}
	return false;
}

function extractNumber(array, i, j) {
	let number = "";

	if (/\d/.test(array[i][j])) {
		number += array[i][j];

		let left = j - 1;
		let right = j + 1;

		while (/\d/.test(array[i][left])) {
			number = array[i][left] + number;
			left--;
		}
		while (/\d/.test(array[i][right])) {
			number += array[i][right];
			right++;
		}
	} else {
		return undefined;
	}

	return Number(number);
}

function solvePartTwo() {
	const array = input.split("\n").map((line) => line.split(""));

	let sum = 0;
	for (let i = 0; i < array.length; i++) {
		const line = array[i];
		for (let j = 0; j < line.length; j++) {
			const char = line[j];

			if (char != "*") continue;

			const adjacentNumbers = [];

			for (let k = i - 1; k <= i + 1; k++) {
				for (let l = j - 1; l <= j + 1; l++) {
					if (array[k]?.[l] && /[\d]/.test(array[k][l])) {
						const number = extractNumber(array, k, l);
						if (number) adjacentNumbers.push(number);

						if (/\d/.test(array[k][l + 1])) {
							break;
						}
					}
				}
			}

			if (adjacentNumbers.length === 2) {
				sum += adjacentNumbers[0] * adjacentNumbers[1];
			}
		}
	}

	return sum;
}

console.log(solvePartTwo());
