CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) UNIQUE NOT NULL,

    name VARCHAR(255),

    bio TEXT,

    public_repos INT DEFAULT 0,

    followers INT DEFAULT 0,

    following INT DEFAULT 0,

    total_stars INT DEFAULT 0,

    total_forks INT DEFAULT 0,

    account_age_days INT DEFAULT 0,

    most_starred_repo VARCHAR(255),

    top_language VARCHAR(100),

    profile_score INT DEFAULT 0,

    profile_rank VARCHAR(50),

    profile_url VARCHAR(255),

    avatar_url TEXT,

    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);