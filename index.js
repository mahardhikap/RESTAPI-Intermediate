const express = require('express')
const bodyParser = require('body-parser')
const app =  express()
const port = 3000
const recipe = require('./src/router/recipeRouter')
const users = require('./src/router/usersRouter')
const morgan = require('./src/middleware/morgan')
const cors = require('./src/middleware/cors')
const xssFilters = require('./src/middleware/xssFilters')
const helmet = require('./src/middleware/helmet')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(morgan)
app.use(cors)
app.use(helmet)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/', (req, res) => {
    let firstname = req.query.firstname; //jika ada input aneh dari users
    res.send('<h1> Hello, ' + xssFilters.inHTMLData(firstname) + '!</h1>');
});

app.use(recipe)
app.use(users)

app.listen(port, ()=>{
    console.log(`App running on http://localhost:${port}`)
})