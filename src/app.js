const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

// Get templates and public folder paths
const templatePath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '..', 'public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Create and initialize the express app
const app = express()
app.set('view engine', 'hbs') // Set the view engine to handlebars
app.set('views', templatePath) // Set the views folder
hbs.registerPartials(partialsPath) // Register the partials folder
app.use(express.static(publicPath)) // Serve static files from public folder

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        description: 'This is the home page',
        author: 'Germán Cosio',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'help page',
        author: 'Germán Cosio',
        help_message: 'This is the help page, find the answer to your question',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        description: 'About me page',
        author: 'Germán Cosio',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address',
        })
    }

    geoCode.getGeoCode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            return forecast.getForecast(
                latitude,
                longitude,
                (error, forecast) => {
                    if (error) {
                        return res.send({ error })
                    }
                    return res.send({
                        forecast: forecast,
                        location: location,
                        adddress: req.query.address,
                    })
                }
            )
        }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        description: 'Help article not found',
        author: 'Germán Cosio',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        description: 'Page not found',
        author: 'Germán Cosio',
    })
})

// Start the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
