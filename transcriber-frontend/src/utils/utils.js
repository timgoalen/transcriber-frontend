export function generateTimestamp() {
  return Date.now().toString();
}

// CHANGE TO A MORE CURATION RANGE OF COLOURS
export function generateRandomColour() {
  const letters = "0123456789ABCDEF";
  let colour = "#";

  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }

  return colour;
}
