const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// UserSchema.pre('save', async function(next) {
//   const user = this;

//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });

const User = mongoose.model('User', UserSchema);

module.exports = User;
