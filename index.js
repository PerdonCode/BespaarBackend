require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/category')
const newsRoutes = require('./routes/news')

const app = express()

// middleware
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes 
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/news', newsRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connectie gemaakt met database en actief op port 4000')
        })
    })
    .catch ((error) => {
        console.log(error)
    })
