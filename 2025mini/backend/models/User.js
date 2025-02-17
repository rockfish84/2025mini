const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },  // 이메일 인증 여부 추가
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);  // 비밀번호 해싱
    console.log("Hashed password:", this.password);  // 해시된 비밀번호 확인용
    next();
  });
  

module.exports = mongoose.model("User", UserSchema);
