import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserToDB(zodParseData);

    res.status(200).json({
      success: true,
      message: "User is Created Succesfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSignleUserFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: "Users fetched successfully!",
        data: result,
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteSignleUserFromDB(Number(userId));
    console.log(result);
    if (result) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    // console.log(userData);
    const zodParseData = userValidationSchema.parse(userData);
    const result = await UserServices.updateSignleUserToDB(
      Number(userId),
      zodParseData
    );
    console.log(result);
    if (result) {
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const addNewProductToUser = async (req: Request, res: Response) => {
  try {
    const prodcutData = req.body;
    const { userId } = req.params;
    // console.log(prodcutData, req.body, req.params);

    const result = await UserServices.addNewProdcutToDB(
      Number(userId),
      prodcutData
    );
    // console.log(result);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const getAllProductToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getProductFromDB(Number(userId));
    if (result) {
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
const getTotalPriceOfProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getTotalProductPriceFromDB(
      Number(userId)
    );
    console.log(result?.orders);

    if (result) {
      const price = result?.orders?.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      );
      res.status(200).json({
        success: true,
        message: result?.orders
          ? "Total price calculated successfully!"
          : "Don't have any order to calculate",
        data: {
          totalPrice: price,
        },
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  addNewProductToUser,
  getAllProductToUser,
  getTotalPriceOfProduct,
};
