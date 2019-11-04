const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs'); /* handlebars engine*/
app.set('views', viewsPath); /* views engine */
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather app',
        name: 'Phakamani Mkulise'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        name : 'Phakamani Mkulise'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'How to use this website',
        title: 'Help',
        name: 'Phakamani Mkulise'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must provide address"
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (forecastError, data) => {
            if (forecastError) {
                return res.send({error: forecastError});
            }
            res.send({
                location,
                forecast: data,
                address
            })
        })
    })
});

app.get('/help/*' ,(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Phakamani Mkulise',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Phakamani Mkulise',
        errorMessage: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

module.exports = app;