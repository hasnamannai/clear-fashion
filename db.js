// Import Mongoose
const mongoose = require('mongoose');
const server = require('./server.js')

// Import Product model
const Product = require('./models/productModel');

// Connect to MongoDB
mongoose.connect('mongodb+srv://hasna:Univers.1@devapi.uggjwm8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Read the JSON file
const products = require('./data/products2.json');

// Loop through each product and add to the database
products.forEach(async (product) => {
  try {
    // Create a new Product document
    const newProduct = new Product(product);
    

    // Save the new Product document to the database
    console.log("loading")
    await newProduct.save();
    
  } catch (err) {
    console.log(err);
  }
});

console.log('Imported products to MongoDB');
