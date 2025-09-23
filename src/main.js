
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Routes
app.get("/", (req, res) => res.render("home"));
app.get("/booking", (req, res) => res.render("booking"));
app.get("/chatbot", (req, res) => res.render("AI_chatbot"));
app.get("/resources", (req, res) => res.render("resource"));
app.get("/peersupport", (req, res) => res.render("peerSupport"));
app.get("/admin", (req, res) => res.render("addmin"));
app.get("/sih", (req, res) => res.render("sih"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));