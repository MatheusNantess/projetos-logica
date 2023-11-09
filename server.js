const express = require('express')
const BodyParser = require('body-parser')
const https = require('https')

const app = express()

app.use(BodyParser.urlencoded({extended: true}))

app.listen(3000, function(){
    console.log("Server created on port 3000")
})
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})  

app.post("/information", function(req,res){
    const query = req.body.cityName
    const apiKey = "053e8c55e8f2239476b6b43aa529ca58"
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write(`<h1>The temperature in ${query} is ${temp} degrees.</h1>`)
            res.write(`<p>The weather is currently with ${weatherDescription}</p>`)
            res.write("<img src="+ imageUrl +">")

            
        })
        
    })
    
})





