const splitTextByWords = (text, wordLimit) => {
  const words = text.split(' ');
  let result = [];
  for (let i = 0; i < words.length; i += wordLimit) {
    result.push(words.slice(i, i + wordLimit).join(' '));
  }
  return result;
};


export default splitTextByWords