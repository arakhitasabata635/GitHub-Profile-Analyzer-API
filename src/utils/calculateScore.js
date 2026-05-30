const calculateScore = (followers, publicRepos, totalStars) => {
  return followers * 2 + publicRepos + totalStars;
};

module.exports = calculateScore;
