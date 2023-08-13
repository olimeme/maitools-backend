require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors"),
  userRoutes = require("./routes/user");

const PORT = process.env.PORT || 8000;

//Connect to database
try {
  mongoose.connect("mongodb://localhost:27017/usersdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

//using user route
app.use(userRoutes);

//setup server to listen on port 8080
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
