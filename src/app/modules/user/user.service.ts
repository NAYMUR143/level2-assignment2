import { TOrder, TUserType } from "./user.interface";
import User from "./user.model";

const createUserToDB = async (user: TUserType) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error("User already exists!");
  }
  const result = await User.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select(
    "-_id username fullName age email address "
  );
  return result;
};
const getSignleUserFromDB = async (userId: number) => {
  const isUserExists = await User.isUserExists(userId);
  if (!isUserExists) {
    return false;
  }
  const result = await User.findOne({ userId }).select(
    "-_id userId username fullName age email isActive hobbies address "
  );
  return result;
};

const deleteSignleUserFromDB = async (userId: number) => {
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    return false;
  }
  const result = await User.findOneAndDelete({ userId });
  return result;
};
const updateSignleUserToDB = async (userId: number, user: TUserType) => {
  const isUserExists = await User.isUserExists(userId);

  if (!isUserExists) {
    return false;
  }
  await User.updateOne({ userId }, user);
  const updatedUser = await User.findOne({ userId }).select(
    "-_id userId username fullName age email isActive hobbies address "
  );
  return updatedUser;
};
const addNewProdcutToDB = async (userId: number, product: TOrder) => {
  const isUserExists = await User.isUserExists(userId);
  // console.log(product);

  if (!isUserExists) {
    return false;
  }
  const result = await User.updateOne(
    { userId },
    {
      $push: {
        orders: {
          productName: product.productName,
          price: product.price,
          quantity: product.quantity,
        },
      },
    }
  );

  return result;
};
const getProductFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select("-_id orders orders_id");
  return result;
};
const getTotalProductPriceFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select("-_id orders.price");
  console.log(result?.orders);
  const totalPrice = result?.orders?.reduce(
    (sum, order) => sum + order.price,
    0
  );
  return totalPrice;
};
export const UserServices = {
  createUserToDB,
  getAllUserFromDB,
  getSignleUserFromDB,
  deleteSignleUserFromDB,
  updateSignleUserToDB,
  addNewProdcutToDB,
  getProductFromDB,
  getTotalProductPriceFromDB,
};
