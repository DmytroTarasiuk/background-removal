import express from "express";
import multer from "multer";
import cors from "cors";
import { createServer, Server } from "http";
import { removeBackground, Config } from "@imgly/background-removal-node";

const app: express.Application = express();
const server: Server = createServer(app);

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const imglyConfig: Config = {
  debug: true,
  model: "medium",
  output: {
    format: "image/png",
    quality: 0.8,
    type: "foreground",
  },
};

app.post(
  "/remove-background",
  async (req: express.Request, res: express.Response) => {
    upload(req, res, async (err: any) => {
      if (err) {
        return res.status(400).json({
          error:
            "Unexpected field. Please check your file upload configuration.",
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

        const buffer: Buffer = Buffer.from(await result.arrayBuffer());
        const base64Image: string = buffer.toString("base64");

        // Send the binary data
        res.send(base64Image);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
      }
    });
  }
);

server.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});

export { app, server };
