const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const Todos = require('./router');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(Todos)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})