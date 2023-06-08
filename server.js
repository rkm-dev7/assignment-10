const { app, PORT, DB_HOST, mongoose } = require("./app");

// Database connection with mongoose
const mongooseConnection = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

// Createing Server

app.listen(PORT, () => {
  console.log(`server is running at http://127.0.0.1:${PORT}`);
  mongooseConnection();
});
