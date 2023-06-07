const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/latestdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Import the Ticket model
const Ticket = require('./models/Ticket');

// Define routes here
const homeRouter = require('./routes/index');
const addRouter = require('./routes/add');
const deleteRouter = require('./routes/delete');
const productsRouter = require('./routes/products');
const contactRouter = require('./routes/contact');
const displayRouter = require('./routes/display.js')

app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/contact', contactRouter);
app.use('/add',addRouter);
app.use('/delete',deleteRouter);
app.use('/display',displayRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});