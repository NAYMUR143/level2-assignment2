import { Schema, model, connect, Model } from "mongoose";
import {
  IUserModel,
  TAddress,
  TFullName,
  TOrder,
  TUserType,
} from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userFullNameSchema = new Schema<TFullName>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      maxlength: [15, "First Name can not be more than 15 Characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
  },
  {
    _id: false,
  }
);
const userAddressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    _id: false,
  }
);
const userOrderSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    _id: false,
  }
);
const userSchema = new Schema<TUserType>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    require: [true, "password is require"],
    minlength: [6, "password can not be less than 6 Characters"],
    maxlength: [20, "password can not be more than 20 Characters"],
  },
  fullName: { type: userFullNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String, required: true }],
  address: { type: userAddressSchema, required: true },
  orders: { type: [userOrderSchema], default: undefined },
});

//
userSchema.set("toJSON", {
  transform: (doc, { _id, password, __v, isDeleted, ...rest }) => {
    return rest;
  },
});
//pre save middleware / hook
userSchema.pre("save", async function (next) {
  // console.log(this, "pre hook : we will save the data");
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

// //post save middleware / hook
// userSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

// //Query middleware
// userSchema.pre("find", function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

userSchema.statics.isUserExists = async function (userId) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

const User = model<TUserType, IUserModel>("User", userSchema);
export default User;
