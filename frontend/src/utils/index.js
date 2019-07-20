export const StringHelper = {
  capitalize: strings => {
    return strings
      .split('')
      .map((alphabet, i) => {
        if (i === 0) {
          return alphabet.toUpperCase()
        }
        return alphabet
      })
      .join('')
  },
}
