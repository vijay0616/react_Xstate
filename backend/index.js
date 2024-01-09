const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/api/articles/:page", async (req, res) => {
  const page = req.params.page;

  try {
    const response = await fetch(
      `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`
    );

    const articles = await response.json();
    res.status(200).json(articles.nodes);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
