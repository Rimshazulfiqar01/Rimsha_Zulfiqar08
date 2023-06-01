const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/latestdb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });

// Define routes here
const homeRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const contactRouter = require('./routes/contact');

app.use('/index', homeRouter);
app.use('/products', productsRouter);
app.use('/contact', contactRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});