const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const {
    title
} = require('process')


const app = express()
const port = process.env.PORT || 3000;

// Defile path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ajay suryawanshi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ajay Suryawanshi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help page!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address !'
        })
    }

    geocode(req.query.address, (err, data) => {
        if (err) {
            return res.send({
                err
            })
        }
        res.send({
            location: data,
            address: req.query.address
        })
    })

    // console.log(req.query.address)
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ajay Suryawanshi',
        errorMessage: 'Page Not Found'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ajay Suryawnshi',
        errorMessage: 'Page Not Found'
    })
})


app.listen(port, () => {
    console.log('Server is running on port number' + port)
})