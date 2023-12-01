import { input } from "./day-01-input.js";

function solvePartOne() {
	return input
		.split("\n")
		.map((line) => line.match(/(\d).*(\d)|(\d)/))
		.reduce((acc, [, a, b, c]) => acc + Number(`${a || c}${b || c}`), 0);
}

function solvePartTwo() {
	return input
		.replace(/one/g, "$&1$&")
		.replace(/two/g, "$&2$&")
		.replace(/three/g, "$&3$&")
		.replace(/four/g, "$&4$&")
		.replace(/five/g, "$&5$&")
		.replace(/six/g, "$&6$&")
		.replace(/seven/g, "$&7$&")
		.replace(/eight/g, "$&8$&")
		.replace(/nine/g, "$&9$&")
		.split("\n")
		.map((line) => line.match(/(\d).*(\d)|(\d)/))
		.reduce((acc, [, a, b, c]) => acc + Number(`${a || c}${b || c}`), 0);
}

console.log(solvePartTwo());
