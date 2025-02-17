const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

// MongoDB 연결 설정
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,  // 연결 타임아웃 시간 설정
}).then(() => {
  console.log("MongoDB 연결 성공!");
}).catch((err) => {
  console.error("MongoDB 연결 오류:", err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
