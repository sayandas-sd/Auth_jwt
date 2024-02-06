const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const app = express();

app.use(bodyParser.json());
app.use("/admin",adminRouter);
app.use("/user", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server s running on port ${PORT}`);
});
