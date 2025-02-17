const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 🔥 사용자 정보 조회
router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id || id === "undefined") {
      return res.status(400).json({ message: "잘못된 사용자 ID 요청" });
    }
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("🚨 사용자 정보 조회 오류:", error);
      res.status(500).json({ message: "서버 오류 발생" });
    }
});

// 🔥 문제 업데이트 (토큰 갱신 포함)
router.post("/user/update-problem", async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "사용자 ID가 제공되지 않았습니다." });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }

      // 🔥 currentProblemId 증가 (최대 8까지)
      if (user.currentProblemId < 8) {
        user.currentProblemId += 1;
      }
      
      await user.save();

      // ✅ 새로운 JWT 생성 (갱신된 currentProblemId 포함)
      const newToken = jwt.sign(
        { userId: user._id.toString(), username: user.username, currentProblemId: user.currentProblemId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "문제 업데이트 완료", token: newToken, currentProblemId: user.currentProblemId });
    } catch (error) {
      console.error("🚨 문제 업데이트 오류:", error);
      res.status(500).json({ message: "서버 오류 발생" });
    }
});

module.exports = router;
