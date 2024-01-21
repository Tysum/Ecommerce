const express = require("express");
const dbConnnect = require("./config/dbConnect");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 4000;
const authRoute = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const productRoute = require("./routes/productRoutes");
const morgan = require("morgan");

const app = express();
dbConnnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", authRoute);
app.use("/api/v1/products", productRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});