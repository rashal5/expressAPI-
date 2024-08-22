const express = require('express')
const app = express()
const Product = require('./models/product.model.js');
const mongoose = require('mongoose');
//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));



app.get('/', (req, res) => {
    res.send('the respose came nno dejds api')
  })


 
  

app.get('/api/products',async(req,res)=>{
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message : error.message})
  }
})


app.post('/api/products',async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message : error.message})
       
    }
  })

  app.get('/api/products/:id',async (req, res) => {
    try {
      const { id } = req.params;
      const  product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message : error.message})
       
    }
  })

  
  app.put('/api/products/:id',async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, req.body);
        if (!Product){
          return res.status(404).json({message:"the product not find"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({message : error.message})
       
    }
  })


  app.delete('/api/products/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!Product){
          return res.status(404).json({message:"the product not find"});
        }
        res.status(200).json({message:"the product where deleted"});
    } catch (error) {
      res.status(500).json({message : error.message})
       
    }
  })






mongoose.connect("mongodb+srv://rashal5:2diDpi6gyhsOxys6@backenddb.wpovy.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log('mongodb was connected');
    app.listen(30000,()=>{
        console.log('The server runing onthe port of 3000');
        
    })
    
})
.catch((e)=>{
    console.log(e);
    
    console.log('the connection was failed');
    
});
