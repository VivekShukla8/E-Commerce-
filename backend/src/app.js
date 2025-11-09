// backend/src/app.js
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowed = [
  "https://e-commerce-etiqu336g-vivek-shuklas-projects-8ebbc1b2.vercel.app",
  "https://e-commerce-gamma-gules-42.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/coupons", couponRoutes);
app.use("/payments", paymentRoutes);
app.use("/analytics", analyticsRoutes);

export default app;