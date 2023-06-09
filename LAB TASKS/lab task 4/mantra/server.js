const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
const Dress = require("./models/dress");

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/clothingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Display route
app.get('/display', async (req, res) => {
  try {
    const dress = await Dress.find();
    res.render('display', { dress: dress });
  } catch (err) {
    console.log(err);
    res.render('display', { dress: [] });
  }
});

// Remove route
app.get("/remove/:id", async (req, res) => {
  const id = req.params.id;
  await Dress.findByIdAndDelete(id);
  res.redirect("/display");
});

// Add route
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  try {
    const { Size, Colour, Price } = req.body;
    const newDress = new Dress({ Size, Colour, Price });
    await newDress.save();
    res.redirect("/display");
  } catch (err) {
    console.log(err);
    res.redirect("/add"); // Redirect to add form or handle the error
  }
});

// Edit route
app.get('/edit/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const selectedDress = await Dress.findById(id).exec();
    res.render('edit', { dress: selectedDress });
  } catch (err) {
    console.log(err);
    res.redirect('/display'); // Redirect to display or handle the error
  }
});

app.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  const newSize = req.body.size;
  const newColour = req.body.colour;
  const newPrice = req.body.price;

  try {
    const updatedDress = await Dress.findByIdAndUpdate(id, {
      Size: newSize,
      Colour: newColour,
      Price: newPrice
    });
    res.redirect('/display');
  } catch (err) {
    console.log(err);
    res.redirect('/display'); // Redirect to display or handle the error
  }
});




// Define routes here
const homeRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const contactRouter = require('./routes/contact');
const displayRouter = require('./routes/display.js')

app.use('/', homeRouter);
app.use('/index', homeRouter);
app.use('/products', productsRouter);
app.use('/contact', contactRouter);
app.use('/display',displayRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
