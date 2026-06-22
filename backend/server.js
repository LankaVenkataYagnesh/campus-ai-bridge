const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json({ limit: "5mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Campus AI Skill Bridge Backend Running",
    status: "success",
    aiEngine: "Ollama Gemma 4"
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

app.use((error, req, res, next) => {
  console.error("Server Error:", error.message);

  res.status(500).json({
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Backend URL: http://localhost:${PORT}`);
  console.log("AI Engine: Ollama Gemma 4");
});