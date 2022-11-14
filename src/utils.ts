export function generateHash() {
	return BigInt(Math.floor(Math.random() * 36 ** 16)).toString(36);
}

export function* idGenerator() {
	const mainId = generateHash();
	let i = 0;

	while (true) {
		yield mainId + `-${i++}`;
	}

	return mainId + `-${i++}`;
}
