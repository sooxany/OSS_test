const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // 비밀번호가 수정되었을 때만 해시
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// module.exports = mongoose.model('User', UserSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;
