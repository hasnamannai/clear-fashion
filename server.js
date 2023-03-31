const express =require('express')
const mongoose= require('mongoose')
const Product = require('./models/productModel')
const app= express()
 
//express midelware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// to declare routes
app.get('/',(req,res)=>{
    res.send('hello Hasna')
})

//j'ai fait app.get pour tester
app.get('/brand',(req,res)=>{
    res.send('there are some brands here')
})



//to get data from database

app.get('/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });
  
  // to get a specific product by its id
  app.get('/products/:id',async(req, res)=>{
    try{
        const {id}=req.params;
        const product= await Product.findById(id);
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})

    }
  })
// to get a specific product by its brand-name

app.get('/products/:brand-name',async(req, res)=>{
  try{
      const {name}=req.params;
      const product= await Product.findById(name);
      res.status(200).json(product)
  }catch(error){
      res.status(500).json({message:error.message})

  }
})


app.post('/products', async(req,res)=>{
    try{
        const product= await Product.create(req.body)
        res.status(200).json(product);

    }catch(error){
        console.log(error.message)
        res.status(500).json({message : error.message})
    

    }
})

//update a product
app.put('/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: `Cannot find product with ID ${id}` });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
// delete product 
app.delete('/products/:id', async(req, res)=>{
        try{
            const {id}= req.params;
            const product = await Product.findByIdAndDelete(id);
            if(!product){
                return res.status(404).json({message: `cannot find product with ID ${id}`});
            }
            res.status(200).json(product)
        }catch(error){
            res.status(500).json({ message: error.message });

        }

})


// //une autre essai 
// const {MongoClient} = require('mongodb');
// const MONGODB_DB_NAME = 'clearfashion';
// const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
// const db =  client.db(MONGODB_DB_NAME)
// const fs = require('fs');

// // read the contents of the JSON file
// //const data = fs.readFileSync('cotele.json');

// // parse the JSON data into an array of objects
// const products = JSON.parse(data);

// // insert the products into the database
// const collection = db.collection('products');
// const result = await collection.insertMany(products);

// console.log(`${result.insertedCount} products inserted`);




mongoose.set('strictQuery',false)
mongoose.connect("mongodb+srv://hasna:Univers.1@devapi.uggjwm8.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000,()=> {
        console.log('Node API is running on port 3000')
    })
    console.log('connected to mongodb')
}).catch(()=>{
    console.log(error)
})