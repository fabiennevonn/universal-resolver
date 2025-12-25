const express = require("express");
const router = express.Router();
const { resolveDid } = require("../services/universal-resolver-service");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/resolve", async (req, res) => {
  try {
    const did = req.body.did;

    if (!did) {
      return res.render("index", {
        error: "Bitte eine DID eingeben"
      });
    }

    const result = await resolveDid(did);

    res.render("index", {
      did,
      result: JSON.stringify(result, null, 2)
    });
  } catch (err) {
    res.render("index", {
      error: err.message
    });
  }
});

module.exports = router;
