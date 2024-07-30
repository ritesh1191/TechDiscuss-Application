const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const postRoute = require("./routes/posts.js");
const commentRoute = require("./routes/comments.js");

// database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("connected to database sucessfully");
  } catch (err) {
    console.log(err);
  }
};

// middlewares
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Image Upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is Running on Port ${process.env.PORT}`);
});
