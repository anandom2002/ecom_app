import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connecDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";

//configure env
dotenv.config();

// database config
connecDB();

// creating rest object
const app = express();

// middleware
app.use(cors()); //to avoid any error btw different servers
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest apai
// app.get("/", (req, res) => {
//   res.send("<h1>welcome to e com app</h1>");
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// port
const PORT = process.env.PORT || 8080;

//run
app.listen(PORT, () => {
  console.log(
    `server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white
  );
});
