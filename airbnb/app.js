//External Imports
const express = require('express');

// Local Imports
const userRouter = require('./routes/userRouter');
const {hostRouter} = require('./routes/hostRouter');
const { getErrorPage } = require('./controllers/errorController');


const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

app.use(userRouter);
app.use(hostRouter);

// 404 Page
app.use(getErrorPage);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});