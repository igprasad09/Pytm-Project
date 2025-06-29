const express = require("express");
const cors = require('cors');
const {User} = require('./db.js');
const rootRouter = require('./routers/index.js');
const userRouter = require('./routers/user.js');
const accountRouter = require('./routers/account.js');
const {JWT_SECRET} = require('./config.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1',rootRouter);
app.use('/api/v1',userRouter);
app.use('/api/v1',accountRouter);

app.listen(3000,console.log("server is running..."))
