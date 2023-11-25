import { z } from "zod";

const fullNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .max(15, { message: "First Name can not be more than 20 Characters" })
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: "First Name should start with a capital letter",
    }),
  lastName: z.string().min(1),
});

const addressSchema = z.object({
  street: z.string().min(1, { message: "Street Name is required" }),
  city: z.string().min(1, { message: "City Name is required" }),
  country: z.string().min(1, { message: "Country Name is required" }),
});

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z
    .string()
    .min(6, { message: "password can not be less than 6 Characters" })
    .max(20, { message: "password can not be more than 20 Characters" }),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().email({ message: "Invalid email address" }),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
});

export default userValidationSchema;

// export type naymur  = z.infer<typeof userValidationSchema>
