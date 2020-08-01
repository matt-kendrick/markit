require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//setup database connection
let db = process.env.DB_CONNECTIONSTRING;
db = db.replace('<PASSWORD>',process.env.DB_PASSWORD);

mongoose
  .connect(db, {useNewUrlParser: true,useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
  .then(() => console.log('DB connection successful!'));

const app = express();
const port = 80;

//routers
const bookmarkRouter = require('./routes/bookmarkRoutes');

//middleware

//logging
app.use((req,res,next) => {
    console.log(req.path,req.query);
    next();
});

app.use(express.json()); //json parser
app.use(express.static(`${__dirname}/public`)); //serves static files

//process routers
app.use('/api/bookmarks/', bookmarkRouter);

app.listen(port,() => console.log(`Listening on port: ${port}`));