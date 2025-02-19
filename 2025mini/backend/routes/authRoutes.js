const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// 이메일 인증을 위한 nodemailer 설정
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ 회원가입 API
router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "모든 필드를 입력하세요." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }

    const newUser = new User({
      username,
      email,
      password,
      isVerified: false,
      currentProblemId: 1,
    });

    await newUser.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const verificationLink = `http://localhost:5000/api/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "회원가입 인증 메일",
      html: `<h3>2025 동박 미니 미궁입니다. 이메일 인증을 완료하려면 아래 링크를 클릭하세요:</h3>
             <a href="${verificationLink}">이메일 인증하기</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "회원가입 성공! 인증 메일을 확인해주세요." });
  } catch (error) {
    console.error("회원가입 처리 중 오류:", error);
    res.status(500).json({ message: "서버 오류 발생", error });
  }
});

// ✅ 이메일 인증 API
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "유효하지 않은 요청입니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: "사용자를 찾을 수 없습니다." });
    }

    user.isVerified = true;
    await user.save();

    res.redirect("http://localhost:3000/login");
  } catch (error) {
    res.status(400).json({ message: "유효하지 않은 또는 만료된 토큰입니다." });
  }
});

// ✅ 로그인 API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "유저명과 비밀번호를 입력하세요." });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "계정을 찾을 수 없습니다." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "이메일 인증이 완료되지 않았습니다." });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), username: user.username, currentProblemId: user.currentProblemId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "로그인 성공", token });
  } catch (error) {
    console.error("로그인 중 오류:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

// ✅ 계정 초기화 API
router.post("/user/reset", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "사용자 ID가 제공되지 않았습니다." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    user.currentProblemId = 1;
    await user.save();

    res.status(200).json({ message: "계정이 초기화되었습니다." });
  } catch (error) {
    console.error("🚨 계정 초기화 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// ✅ 비밀번호 찾기 요청 API (이메일 전송)
router.post("/password-reset-request", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "이메일을 입력하세요." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "해당 이메일로 등록된 계정이 없습니다." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "비밀번호 재설정 요청",
      html: `<h3>2025 동박 미니 미궁입니다. 비밀번호를 재설정하려면 아래 링크를 클릭하세요:</h3>
             <a href="${resetLink}">비밀번호 재설정</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "비밀번호 재설정 링크가 이메일로 전송되었습니다." });
  } catch (error) {
    console.error("🚨 비밀번호 재설정 요청 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
});

// ✅ 비밀번호 재설정 (Reset Password)
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "유효하지 않은 요청입니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: "사용자를 찾을 수 없습니다." });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    console.error("🚨 비밀번호 변경 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
});


// ✅ 비밀번호 변경 API
router.post("/user/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "모든 필드를 입력하세요." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 기존 비밀번호 검증
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "현재 비밀번호가 일치하지 않습니다." });
    }

    // 새로운 비밀번호 해싱 후 저장
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    console.error("🚨 비밀번호 변경 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
});


module.exports = router;
