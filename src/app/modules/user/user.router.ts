import express from "express";
import { UserController } from "./user.controller";
const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUser);
router.get("/:userId", UserController.getSingleUser);
router.delete("/:userId", UserController.deleteSingleUser);
router.put("/:userId", UserController.updateSingleUser);
router.put("/:userId/orders", UserController.addNewProductToUser);
router.get("/:userId/orders", UserController.getAllProductToUser);
router.get(
  "/:userId/orders/total-price",
  UserController.getTotalPriceOfProduct
);

export const UserRoutes = router;
