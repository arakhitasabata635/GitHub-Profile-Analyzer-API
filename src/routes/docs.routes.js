const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    endpoints: {
      analyze: "POST /api/github/analyze/:username",

      allProfiles: "GET /api/github/profiles?page=1&limit=10",

      singleProfile: "GET /api/github/profiles/:username",
      searchProfiles: "GET /api/github/search?username=octo",
    },
  });
});

module.exports = router;
