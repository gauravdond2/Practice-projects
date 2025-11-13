//External Imports
const express = require('express');

// Local Imports
const userRouter = require('./route/userRouter');
const {hostRouter} = require('./route/hostRouter');


const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

app.use(userRouter);
app.use(hostRouter);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404',{pageTitle: 'Page Not Found'});
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});