const axios = require("axios");

const getGithubProfile = async (username) => {
  const headers = {};

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`,
    { headers },
  );

  const reposResponse = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers },
  );

  const user = userResponse.data;
  const repos = reposResponse.data;

  let totalStars = 0;
  let totalForks = 0;

  const languages = {};

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  let topLanguage = null;

  if (Object.keys(languages).length > 0) {
    topLanguage = Object.keys(languages).reduce((a, b) =>
      languages[a] > languages[b] ? a : b,
    );
  }

  const mostStarredRepo =
    repos.length > 0 ?
      repos.reduce((prev, current) =>
        prev.stargazers_count > current.stargazers_count ? prev : current,
      ).name
    : null;

  const accountAgeDays = Math.floor(
    (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24),
  );

  return {
    username: user.login,
    name: user.name,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars,
    totalForks,
    mostStarredRepo,
    topLanguage,
    accountAgeDays,
    profileUrl: user.html_url,
    avatarUrl: user.avatar_url,
  };
};

module.exports = {
  getGithubProfile,
};
