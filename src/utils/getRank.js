const getRank = (score) => {
  if (score < 50) {
    return "Beginner";
  }

  if (score < 200) {
    return "Intermediate";
  }

  if (score < 1000) {
    return "Advanced";
  }

  return "Open Source Contributor";
};

module.exports = getRank;
