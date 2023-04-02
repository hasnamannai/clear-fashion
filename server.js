const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/productModel');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://hasna:Univers.1@devapi.uggjwm8.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

// Define the Product schema
/*
 const productSchema = new mongoose.Schema({
   brand_name: { type: String, required: true },
   link: { type: String, required: false },
   img: { type: String, required: true },
   title: { type: String, required: true },
   price: { type: Number, required: true },
 }, {
   timestamps: true,
 });
*/
// Create the Product model
//const Product = mongoose.model('Product', productSchema);

app.use(express.json());
app.use(cors());

// Define the routes
app.get('/', (req, res) => {
  res.send('Hello from the API!');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


app.get('/products/search', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12;
    const brand = req.query.brand;
    const price = req.query.price;

    // Build the query object based on provided filters
    const query = {};
    if (brand) query.brand_name = brand;
    if (price) query.price = { $lte: price };

    // Fetch the products using the query object, limit, and sort by price
    const products = await Product.find(query)
      .limit(limit)
      .sort({ price: 1 });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


app.get('/products/brands', async (req, res) => {
  try {
    const productsByBrand = await Product.aggregate([
      {
        $group: {
          _id: '$brand_name',
          products: { $push: '$$ROOT' }
        }
      }
    ]);

    if (!productsByBrand || productsByBrand.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(productsByBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/products/brand/:brand', async (req, res) => {
  try {
    const { brand } = req.params;
    const products = await Product.find({ brand_name: brand });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified brand' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

//delete all products
app.delete('/products', async(req, res)=>{
  try{
      const products = await Product.deleteMany({});
      if(!products.deletedCount){
          return res.status(404).json({message: "cannot find any products"});
      }
      res.status(200).json({message: "all products deleted successfully"});
  }catch(error){
      res.status(500).json({ message: error.message });
  }
})
// Start the server
app.listen(process.env.PORT || 3000, () => console.log(`Server started on port ${process.env.PORT || 3000}`));


//module.exports = app;