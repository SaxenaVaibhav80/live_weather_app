const express=require('express');
const app=express()
const https=require("https")// to make request to external server;
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000)

app.get("/", function(req,res)
{
  res.sendFile(__dirname+"/weather.html");
})

app.post("/",(req,res)=>
{
   const q=req.body.queryy;
   
     const url="https://api.openweathermap.org/data/2.5/weather?q="+q+"&appid=2580d6341cabc839892c57484205ba9b&units=metric"
       https.get(url,function(response)
       {
           response.on('data',function(data)
           {
           //   console.log(data)
           //   console.log(JSON.parse(data))
             const weatherData=JSON.parse(data);
             const icon=weatherData.weather[0].icon
             const imgUrl='https://openweathermap.org/img/wn/'+icon+'@2x.png'
             res.write("<h1> Current weather in " +q+ " "+" is "+ weatherData.main.temp_max+" "+"degree celsius </h1>")
             res.write('<img src='+imgUrl+'></img>')
             res.send()
           })
       })
       // res.send("this is home rout");
   
})
