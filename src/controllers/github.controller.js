const pool = require("../config/db");

const { getGithubProfile } = require("../services/github.service");

const calculateScore = require("../utils/calculateScore");

const getRank = require("../utils/getRank");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await getGithubProfile(username);

    const profileScore = calculateScore(
      profile.followers,
      profile.publicRepos,
      profile.totalStars,
    );

    const profileRank = getRank(profileScore);

    await pool.query(
      `
      INSERT INTO github_profiles
      (
        username,
        name,
        bio,
        public_repos,
        followers,
        following,
        total_stars,
        total_forks,
        account_age_days,
        most_starred_repo,
        top_language,
        profile_score,
        profile_rank,
        profile_url,
        avatar_url
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE

      name = VALUES(name),
      bio = VALUES(bio),
      public_repos = VALUES(public_repos),
      followers = VALUES(followers),
      following = VALUES(following),
      total_stars = VALUES(total_stars),
      total_forks = VALUES(total_forks),
      account_age_days = VALUES(account_age_days),
      most_starred_repo = VALUES(most_starred_repo),
      top_language = VALUES(top_language),
      profile_score = VALUES(profile_score),
      profile_rank = VALUES(profile_rank)
      `,
      [
        profile.username,
        profile.name,
        profile.bio,
        profile.publicRepos,
        profile.followers,
        profile.following,
        profile.totalStars,
        profile.totalForks,
        profile.accountAgeDays,
        profile.mostStarredRepo,
        profile.topLanguage,
        profileScore,
        profileRank,
        profile.profileUrl,
        profile.avatarUrl,
      ],
    );

    return res.status(200).json({
      success: true,
      profileScore,
      profileRank,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const [profiles] = await pool.query(
      `
      SELECT *
      FROM github_profiles
      ORDER BY analyzed_at DESC
      LIMIT ?
      OFFSET ?
      `,
      [limit, offset],
    );

    res.status(200).json({
      success: true,
      page,
      limit,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const [profile] = await pool.query(
      `
      SELECT *
      FROM github_profiles
      WHERE username = ?
      `,
      [username],
    );

    if (!profile.length) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const searchProfiles = async (req, res) => {
  try {
    const { username } = req.query;

    const [profiles] = await pool.query(
      `
      SELECT *
      FROM github_profiles
      WHERE username LIKE ?
      `,
      [`%${username}%`],
    );

    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  searchProfiles,
};
