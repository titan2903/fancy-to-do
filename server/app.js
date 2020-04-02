const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const Todos = require('./router');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(Todos)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})