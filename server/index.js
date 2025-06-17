const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const { app, server, io } = require("./socket/index"); // include io if needed for global use

const cors = require("cors");

// ✅ Middleware (CORS setup moved into socket/index.js too)
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your frontend Render URL
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("✅ Server is started");
});

// ✅ All API routes
app.use("/api", router);

// ✅ Connect to MongoDB
connectDB();

// ✅ Start the HTTP + Socket.IO server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
