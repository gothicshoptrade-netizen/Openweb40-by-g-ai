import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Serve static files from the internet-landing artifact
const publicPath = path.resolve(__dirname, "..", "..", "internet-landing", "dist", "public");
logger.info({ publicPath }, "Serving static files from");

app.use(express.static(publicPath));

// Handle client-side routing - serve index.html for all non-API routes
app.get(/.*/, (req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({ error: "API route not found" });
    return;
  }
  
  const indexPath = path.join(publicPath, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      logger.error({ err, indexPath, url: req.url }, "Error sending index.html");
      res.status(404).send("Frontend not found. Please ensure the build completed successfully.");
    }
  });
});

export default app;
