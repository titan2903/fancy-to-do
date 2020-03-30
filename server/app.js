const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const Todos = require('./router/todos');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/todos', Todos)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})