const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  console.log("Request body:", req.body);

  try {
    const response = await axios.post(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "6ce380c0-9f4b-4c54-b6ef-715c102426d8" } }
    );
    return res.status(response.status).json(response.data);
  } catch (e) {
    if (e.response) {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(e.response.status).json(e.response.data);
    } else if (e.request) {
      // The request was made, but no response was received
      return res
        .status(500)
        .json({ error: "No response received from server." });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({ error: "Request setup error." });
    }
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
