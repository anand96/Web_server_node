const path = require('path')
//express is a funtion
const express = require('express')
const  hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

const port = process.env.PORT || 3000

//Define Path for Express Config
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static Directoty to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Anand Jha'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Anand Jha'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title :'Help',
        name : 'Anand Jha',
        message  : 'Use stackOverflow'
    })
})



/*
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})*/


/*
app.get('/help', (req, res) => {
    res.send([{
        name : 'Anand',
    },{
        name : 'lazy96'
    }])
})


app.get('/about', (req, res) => { 
    res.send('<h1>About</h1>')
})
*/

 

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error)
        {
            return res.send({
                error 
            })
        }
        forecast(latitude,  longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({
                    error 
                })
            }
           
            return res.send({
                forecast :forecastData,
                location,
                address : req.query.address
            })
        })
        
    })

    /*

    res.send({
        forecast : 'It is snowing',
        address : req.query.address,
        location : location,
        forecastData : forecastData,
    })
    */

})


app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide as Search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [] 
    })
})


 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Anand Jha',
        errorMessage : 'Help Article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'Anand Jha',
        errorMessage : 'Page not found'
    })
    
})

app.listen(port, () => {
  console.log('server is up on port '+port)  
})
