const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { removeBackground, Config } = require("@imgly/background-removal-node");

const app = express();
const port = 3000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const imglyConfig = {
  debug: true,
  model: "medium",
  output: {
    format: "image/png",
    quality: 0.8,
    type: "foreground",
  },
};

app.post("/remove-background", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        error: "Unexpected field. Please check your file upload configuration.",
      });
    }

    try {
      if (!req.file || !req.file.mimetype.startsWith("image/")) {
        return res
          .status(400)
          .json({ error: "Please upload a valid image file." });
      }

      const uint8Array = new Uint8Array(req.file.buffer);

      const result = await removeBackground(uint8Array, imglyConfig);

      const buffer = Buffer.from(await result.arrayBuffer());
      const base64Image = buffer.toString("base64");

      // Send the binary data
      res.send(base64Image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };
