var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

/* GET home page. */
router.get("/", function (req, res, next) {
  const user = { userId: "u_7rgNArdf8we7HYtkdOtHGL84amd2" };
  const apiKey = "sRwLIUgSxN7xQzIfv1mqODwMEUQO/gIMd0JTtPwYViM=";
  const token = jwt.sign(user, apiKey);
  console.log(token);
  async function fetchData() {
    try {
      const url =
        "https://us-central1-ohyay-prod-d7acf.cloudfunctions.net/ohyayapi/list-workspaces";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: token,
      });
      response = JSON.parse(await response.text());
      res.json({ response });
    } catch (error) {
      console.log(error);
    }
  }
  fetchData();
});

module.exports = router;
