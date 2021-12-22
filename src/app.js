if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const app = express();
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
// location

const public = path.join(__dirname,'..','public')
const viewsPath = path.join(__dirname,'..','views')

// setup ejs templete and views location 
app.set('view engine','ejs');
app.set('views',viewsPath);
// set up static directory to serve
app.use(express.static(public));
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    let user = {
        title:'weather',
        name: 'Soumadeep Bagui'
    }
    res.render("index",{user:user});
})

app.get('/about',(req,res)=>{
    res.render("about",{
        user:{
            title:"About",
            name:"Soumadeep Bagui"
        }
    });
})
app.get('/weather',(req,res)=>{
   if(req.query.address!=undefined){
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.render("index",{
                user:{
                    error:error
                }
                
            });
        }
        else{
            const coordinate = data;
            weather(coordinate,(error1,weatherdata)=>{
                if(error1){
                    return res.render("index",{
                        user:{
                            error:error1
                        }
                        
                    });
                }else{
                    const {temprature,feelslike,percip,humidity,is_day,visiblity,windSpeed} = weatherdata
                res.render("index",{
                    user:{
                    display: true,
                    location:coordinate.location, 
                    temprature:temprature,
                    feelslike:feelslike,
                    percip:percip,
                    humidity:humidity,
                    isDay:is_day,
                    visibility:visiblity,
                    windSpeed:windSpeed
                }});
                }
            })
        }
    })
    return;
}
       res.render({
           user:{
           error: "provide valid Location"
           }
       })
       return;
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you must provide a search term"
        })
        
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        user:{
            help:"Mayday !!!!",
            name:"Soumadeep Bagui"
        }
    })
})



app.get('*',(req,res)=>{
    res.render("404",{
        user:{
            name:"Soumadeep Bagui"
        }
    });
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("server running");
})
