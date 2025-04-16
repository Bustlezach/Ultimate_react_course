const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"], // Your frontend origin
    methods: ["GET", "POST"],
    credentials: true, // Allow sending cookies from frontend
  })
);

// Dummy user
const users = [
  {
    id: 1,
    email: "user@example.com",
    password: bcrypt.hashSync("password", 10), // Password: "password"
    refreshToken: null,
    username: "John", //email.split("@")[0],
  },
  {
    id: 2,
    email: "doe@example.com",
    password: bcrypt.hashSync("password", 10), // Password: "password"
    refreshToken: null,
    username: "Doe", //email.split("@")[0],
  },
  {
    id: 3,
    email: "matthew@example.com",
    password: bcrypt.hashSync("password", 10), // Password: "password"
    refreshToken: null,
    username: "Matthew", //email.split("@")[0],
  },
];

// Secrets
const ACCESS_TOKEN_SECRET = "your-secret-key";
const REFRESH_TOKEN_SECRET = "your-refresh-token-secret";

// Token generators
function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

// 🔐 Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      message: "Invalid credentials. Please try again.",
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // Set to true in production (HTTPS)
    sameSite: "strict",
    path: "/api/refresh",
  });

  res.json({
    accessToken,
    user: { id: user.id, email: user.email, username: user.username },
  });
});

// 🔁 Refresh access token
app.get("/api/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const dbUser = users.find((u) => u.id === user.id);
    if (!dbUser) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(dbUser);

    res.json({
      accessToken: newAccessToken,
      user: { id: dbUser.id, email: dbUser.email },
    });
  });
});

// 🚪 Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("refreshToken", { path: "/api/refresh" });
  res.sendStatus(204);
});


// all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// 🔒 Middleware to protect routes
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 🔐 Protected route
app.get("/api/protected", authenticate, (req, res) => {
  res.json({
    message: "Accessed protected route successfully!",
    user: req.user,
  });
});

// 🌐 Root (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🚀 Start server
app.listen(5000, () =>
  console.log("✅ Server started on http://localhost:5000")
);
