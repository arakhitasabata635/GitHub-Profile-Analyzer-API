# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend application built with Node.js, Express.js, and MySQL that analyzes GitHub profiles using the GitHub Public API and stores useful profile insights.

## Features

- Analyze GitHub users by username
- Fetch public profile information from GitHub
- Calculate profile score
- Determine developer rank
- Store analyzed profiles in MySQL
- Fetch all analyzed profiles
- Fetch a single analyzed profile
- Search profiles
- Pagination support
- Input validation
- Error handling

## Tech Stack

- Node.js
- Express.js
- MySQL
- Axios
- GitHub REST API
- Express Validator

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

GITHUB_TOKEN=
```

Run the project:

```bash
npm run dev
```

## Database Setup

Execute the SQL statements provided in `schema.sql`.

## API Endpoints

### Analyze Profile

POST `/api/github/analyze/:username`

### Get All Profiles

GET `/api/github/profiles`

### Get Single Profile

GET `/api/github/profiles/:username`

### Search Profiles

GET `/api/github/search?username=value`

## Postman Collection

Import:

```txt
GitHub-Profile-Analyzer.postman_collection.json
```

## Live API

Render Deployment URL:

```txt
https://github-profile-analyzer-api-upsh.onrender.com
```

## Notes

The application was developed and tested using a local MySQL database. Database schema is included in the repository via `schema.sql`.

## Author

Arakhita Sabata
