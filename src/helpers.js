const pickRandomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

export { pickRandomFromArray };