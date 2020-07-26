const express = require('express');
const mongoose = require('mongoose');

//setup database connection

let db ='mongodb+srv://admin:<PASSWORD>@cluster0.uqnfe.mongodb.net/markit?retryWrites=true&w=majority';
db = db.replace('<PASSWORD>','n13tO3Ms6dZ60uud');

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