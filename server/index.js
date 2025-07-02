require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const contactRouter = require("./routes/contact");
const otpRouter = require("./routes/otp");
const adminRouter = require("./routes/admin");
const connectDb = require("./utilities/db");
const errorFunction = require("./middlewares/error-func");
const cors = require("cors");
const port = process.env.PORT || 3000;

const corsOption = {
    // origin: "https://urbancartel.vercel.app",
    origin: "http://localhost:5173",
    methods: "GET, POST, PATCH, DELETE, PUT, HEAD",
    credentials: true,
}

app.use(express.json());
app.use(cors(corsOption));

app.use("/api", authRouter);
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/contact", contactRouter);
app.use("/api/otp", otpRouter);
app.use("/api/admin", adminRouter);
app.use(errorFunction);

connectDb().then(() => {
    app.listen(port, () => {
        console.log("listening...");
    });
});
