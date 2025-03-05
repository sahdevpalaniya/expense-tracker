const { mongoose, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
// Define the user schema
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    remember_token: {
      type: String,
      default: null,
    },
    activation_status: {
      type: String,
      enum: [0, 1, 2],
      default: 0,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
        expired_dt: {
          type: Date,
          default: null
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Password verify
usersSchema.statics.verifyPass = async function (username, password) {
  try {
    const user = await this.findOne({ username: username });
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      return user;
    } else {
      return undefined;
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Static method to get a single user by ID
usersSchema.statics.getUserById = async function (userId) {
  try {
    return await this.findById(userId).select('-password -tokens -__v');
  } catch (err) {
    console.log(err.message);
  }
};

usersSchema.statics.getUser = async function (column, value) {
  try {
    const query = {};
    query[column] = value;
    return await this.findOne(query);
  } catch (err) {
    console.log(err.message);
  }
};

// Static method to create a new user
usersSchema.statics.createUser = async function (userData) {
  try {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const newUser = await this.create(userData).select('-password -tokens');
    return newUser;
  } catch (err) {
    console.log(err.message);
  }
};

// Static method to update a user by ID
usersSchema.statics.updateUser = async function (userId, updateData) {
  try {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    return await this.findByIdAndUpdate(userId, updateData, { new: true }).select('-password -tokens');
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
};

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
