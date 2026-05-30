const express = require("express");

const usernameValidation = require("../middleware/validateUsername");
const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getProfileByUsername,
  searchProfiles,
} = require("../controllers/github.controller");

router.post("/analyze/:username", usernameValidation, analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profiles/:username", usernameValidation, getProfileByUsername);
router.get("/search", searchProfiles);

module.exports = router;
