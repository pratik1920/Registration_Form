const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port=3019

const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/EV')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema=new mongoose.Schema({
    
    name:String,
    email:String,
    power: mongoose.Schema.Types.Decimal128,
    latitude: Number,
    longitude: Number
})

const Users=mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'for.html'))
})//used to join HTML

app.post('/post',async (req,res)=>{
    const {name,email,power,latitude,longitude}=req.body
    const user=new Users({
        
        
        name,
        email,
        power:mongoose.Types.Decimal128.fromString(power),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")


})

app.listen(port,()=>{
    console.log("Server started")
}) 