const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");  // nodemailer 추가
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// 이메일 인증을 위한 nodemailer 설정
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,  // false -> STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 회원가입 API
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
      isVerified: false,  // 이메일 인증 여부
    });

    await newUser.save();

    // JWT 토큰 생성 (이메일 인증용)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // 이메일 인증 링크 생성
    const verificationLink = `http://localhost:5000/api/verify-email?token=${token}`;

    // 이메일 전송
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "회원가입 인증 메일",
      html: `<h3>이메일 인증을 완료하려면 아래 링크를 클릭하세요:</h3>
             <a href="${verificationLink}">이메일 인증하기</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "회원가입 성공! 인증 메일을 확인해주세요.",
    });
  } catch (error) {
    console.error("회원가입 처리 중 오류:", error);
    res.status(500).json({ message: "서버 오류 발생", error });
  }
});

// 이메일 인증 API
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

    // 인증 성공 후 리디렉션
    res.redirect('http://localhost:3000/login');  // 로그인 페이지로 리디렉션
  } catch (error) {
    res.status(400).json({ message: "유효하지 않은 또는 만료된 토큰입니다." });
  }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "유저명과 비밀번호를 입력하세요." });
    }
  
    try {
      // 유저명으로 사용자 조회
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "계정을 찾을 수 없습니다." });
      }
  
      // 디버깅: 입력된 비밀번호와 저장된 해시된 비밀번호 확인
      console.log("Entered password:", password);  // 입력된 비밀번호
      console.log("Stored hashed password:", user.password);  // 저장된 해시된 비밀번호
  
      // 입력된 비밀번호와 저장된 해시된 비밀번호를 비교
      const isPasswordCorrect = await bcrypt.compare(password, user.password);  // 해시된 비밀번호와 비교
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "비밀번호가 틀렸습니다." });
      }
  
      // 이메일 인증 여부 확인
      if (!user.isVerified) {
        return res.status(400).json({ message: "이메일 인증이 완료되지 않았습니다." });
      }
  
      // JWT 토큰 생성
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // 성공 시 토큰 반환
      res.status(200).json({ message: "로그인 성공", token });
    } catch (error) {
      console.error("로그인 중 오류:", error);
      res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
  });
  
  

module.exports = router;
