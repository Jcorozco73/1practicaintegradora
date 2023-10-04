const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/users.router')
const userProduct = require('./routes/products.router')
const cartRouter = require ('../src/routes/cart.router.js')
const app = express()
const PORT = 8080
const passport = require("passport")


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)

})

app.use(express.json())
app.use(passport.initialize());

mongoose.connect('mongodb+srv://jcmartinorozco:16080073@cluster0.hvxvolp.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    console.log("Connected to MongoDB")
})
.catch(error => {
    console.log(`${error} error`)
})

app.use('/api/users', userRouter)
app.use('/api/products',userProduct )
app.use('api/cart', cartRouter)






