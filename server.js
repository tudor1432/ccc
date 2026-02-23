import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

// Permite primirea de date mari (pentru poze Base64)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, "public")));

// Stocare temporară a datelor (Baza de date în memorie)
let globalUserData = {
  name: "ANATOLIE CHIRIAC",
  dob: "4 November 1998",
  code: "A12 345 67G",
  image: ""
};

// API: Telefonul trimite datele aici
app.post("/update-user-data", (req, res) => {
  globalUserData = { ...globalUserData, ...req.body };
  console.log("Date actualizate pentru:", globalUserData.name);
  res.json({ success: true });
});

// API: Paginile HTML își iau datele de aici
app.get("/api/user-data", (req, res) => {
  res.json(globalUserData);
});

// ---------- RUTE PAGINI (GET) ----------
app.get("/status", (req, res) => res.sendFile(path.join(__dirname, "public/pages/status.html")));
app.get("/prove-your-status", (req, res) => res.sendFile(path.join(__dirname, "public/pages/prove-your-status.html")));
app.get("/get-share-code", (req, res) => res.sendFile(path.join(__dirname, "public/pages/get-share-code.html")));
app.get("/details-employer", (req, res) => res.sendFile(path.join(__dirname, "public/pages/details-employer.html")));

// ---------- NAVIGARE (POST) - Rezolvă Eroarea 405 ----------
app.post("/get-share-code", (req, res) => res.redirect("/prove-your-status"));
app.post("/prove", (req, res) => res.redirect("/get-share-code"));
app.post("/share", (req, res) => res.redirect("/details-employer"));
app.post("/finish", (req, res) => res.redirect("/status"));

app.get("*", (req, res) => res.redirect("/status"));

app.listen(PORT, () => console.log(`🚀 Server pornit pe portul ${PORT}`));