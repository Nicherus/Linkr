const parseTooltipText = (likedArray, isLiked) => {
  let newString = "";
  if (likedArray.length === 0) return "Sem curtidas";
  const likeNames = likedArray.map((like) => like["user.username"]);
  if (isLiked) {
    if (likeNames.length === 1) return "Voce curtiu isso";
    newString = `Voce, ${likeNames[0]} e outras ${
      likeNames.length - 2
    } pessoas `;
  } else {
    if (likeNames.length === 1) return `${likeNames[0]} curtiu isso`;
    newString = `${likeNames[0]}, ${likeNames[1]} e outras ${
      likeNames.length - 2
    } pessoas`;
  }
  return newString;
};

export default parseTooltipText;
