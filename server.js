import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, "public")));

let globalUserData = {
  name: "ANATOLIE CHIRIAC",
  dob: "4 November 1998",
  code: "A12 345 67G",
  image: ""
};

// API
app.post("/update-user-data", (req, res) => {
  globalUserData = { ...globalUserData, ...req.body };
  res.json({ success: true });
});

app.get("/api/user-data", (req, res) => {
  res.json(globalUserData);
});

// ---------- RUTE CONFIGURATE CONFORM SOLICITĂRII ----------

// 1. Status
app.get("/status", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/status.html"));
});

// 2. Get Share Code
app.get("/get-share-code", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/get-share-code.html"));
});

// 3. Prove Your Status (HTML)
app.get("/prove-your-status", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/prove-your-status.html"));
});

// 4. View Your Status (HTML)
app.get("/view-your-status", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/view-your-status.html"));
});

// 5. Details Employer
app.get("/details-employer", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/details-employer.html"));
});

// ---------- LOGICĂ NAVIGARE (POST) ----------

app.post("/status", (req, res) => res.redirect("/get-share-code"));
app.post("/get-share-code", (req, res) => res.redirect("/prove-your-status"));
app.post("/prove-your-status", (req, res) => res.redirect("/view-your-status"));
app.post("/view-your-status", (req, res) => res.redirect("/details-employer"));
app.post("/details-employer", (req, res) => res.redirect("/status"));

// Redirect pentru orice altă rută către Status
app.get("*", (req, res) => res.redirect("/status"));

app.listen(PORT, () => console.log(`🚀 Server pornit pe portul ${PORT}`));
