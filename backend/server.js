import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock user data (no database)
const users = [
  { email: "demo@lumora.com", password: "Lumora@123", name: "Demo User" },
  { email: "thiru@lumora.com", password: "Thiru@123", name: "Thiru" },
];

// New users are kept in memory only (lost when the server restarts)
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Name, email and password are required." });
  }

  const cleanEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === cleanEmail)) {
    return res
      .status(409)
      .json({ success: false, message: "This email is already registered." });
  }

  users.push({ name: name.trim(), email: cleanEmail, password });
  res.status(201).json({ success: true, message: "Account created" });
});

// Backend only checks credentials and replies with JSON. No pages, no redirects.
app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  const user = users.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password." });
  }

  res.json({
    success: true,
    message: "Login successful",
    user: { name: user.name, email: user.email },
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});