// protectedRoutes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authMiddleware");


router.get("/some-protected-route", authenticateToken, (req, res) => {
  res.json({ message: "This is protected data.", user: req.user });
});

module.exports = router;
