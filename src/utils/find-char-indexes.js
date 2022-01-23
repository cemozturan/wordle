export const findAllIndexesOfChar = (char, string) => {
  const indexes = []
  let i = -1
  while ((i = string.indexOf(char, i + 1)) >= 0) {
    indexes.push(i);
  }
  return indexes;
}