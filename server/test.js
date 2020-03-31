const express = require('express')
const app = express()

app.get('/',(req,res)=>{
	res.json("helloworld")
})

app.listen(2000, ()=> console.log('connecting'))