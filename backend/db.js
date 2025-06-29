const mongoose = require('mongoose');

// ✅ 1. Connect properly
mongoose
  .connect('mongodb+srv://admin:admin123@clusterlearn.9aeov48.mongodb.net/paytm_db')
  .then(() => console.log('MongoDB connected…'))
  .catch(console.error);

// ✅ 2. Clean, correctly-spelled schemas
const userSchema = new mongoose.Schema({
  username:  { type: String, required: true },
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  password:  { type: String, required: true }
});

const accountSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true }
});

// ✅ 3. Models
const User    = mongoose.model('signup',    userSchema, 'signup');    // collection = signup
const Account = mongoose.model('Account', accountSchema, 'Account'); // collection = accounts

module.exports = { User, Account };
