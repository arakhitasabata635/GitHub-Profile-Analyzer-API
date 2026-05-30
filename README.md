# GitHub Profile Analyzer API

## Overview

A REST API built with Node.js, Express.js, and MySQL that analyzes GitHub profiles using the GitHub Public API and stores useful insights for future retrieval.

## Features

- Analyze GitHub profiles
- Store profile insights in MySQL
- Retrieve all analyzed profiles
- Retrieve a single analyzed profile
- Search profiles
- Pagination support
- Ranking system
- Profile score calculation

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub API
- Axios

## Installation

1. Clone repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Configure .env

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=github_analyzer
```

4. Run project

```bash
npm run dev
```

## API Endpoints

POST /api/github/analyze/:username

GET /api/github/profiles

GET /api/github/profiles/:username

GET /api/github/search

## Author

Arakhita sabata
