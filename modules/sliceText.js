const sliceText = (text, maxLength) => {
  if (typeof text !== "string") {
    return "";
  }
  return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
};
module.exports = { sliceText };
